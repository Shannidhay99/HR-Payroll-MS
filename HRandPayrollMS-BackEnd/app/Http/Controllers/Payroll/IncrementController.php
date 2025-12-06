<?php

namespace App\Http\Controllers\Payroll;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Payroll\Increment;
use Illuminate\Support\Facades\Validator;
use App\Http\Helpers\SystemLogger;
use Carbon\Carbon;

class IncrementController extends Controller
{
    public function index(Request $request)
    {
        $query = Increment::tenant()->with(['user', 'approver']);

        if ($request->filled('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $increments = $query->orderBy('effective_date', 'desc')->paginate(getPaginate());

        return response()->json([
            'success' => true,
            'data' => $increments,
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'previous_salary' => 'required|numeric|min:0',
            'new_salary' => 'required|numeric|min:0|gt:previous_salary',
            'effective_date' => 'required|date',
            'reason' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation Failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $previousSalary = $request->previous_salary;
        $newSalary = $request->new_salary;
        $incrementAmount = $newSalary - $previousSalary;
        $incrementPercentage = ($incrementAmount / $previousSalary) * 100;

        $increment = Increment::create([
            'user_id' => $request->user_id,
            'tenant_id' => tenant()->id,
            'previous_salary' => $previousSalary,
            'new_salary' => $newSalary,
            'increment_amount' => $incrementAmount,
            'increment_percentage' => round($incrementPercentage, 2),
            'effective_date' => $request->effective_date,
            'reason' => $request->reason,
            'status' => 'pending',
        ]);

        SystemLogger::log('info', "Salary increment created for user ID {$request->user_id}");

        return response()->json([
            'success' => true,
            'message' => 'Increment record created successfully',
            'data' => $increment->load(['user', 'approver']),
        ], 201);
    }

    public function show($id)
    {
        $increment = Increment::tenant()->with(['user', 'approver'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $increment,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $increment = Increment::tenant()->findOrFail($id);

        if ($increment->status !== 'pending') {
            return response()->json([
                'success' => false,
                'message' => 'Cannot update increment that has been processed',
            ], 400);
        }

        $validator = Validator::make($request->all(), [
            'previous_salary' => 'nullable|numeric|min:0',
            'new_salary' => 'nullable|numeric|min:0',
            'effective_date' => 'nullable|date',
            'reason' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation Failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        if ($request->has('previous_salary') || $request->has('new_salary')) {
            $previousSalary = $request->previous_salary ?? $increment->previous_salary;
            $newSalary = $request->new_salary ?? $increment->new_salary;

            if ($newSalary <= $previousSalary) {
                return response()->json([
                    'success' => false,
                    'message' => 'New salary must be greater than previous salary',
                ], 400);
            }

            $incrementAmount = $newSalary - $previousSalary;
            $incrementPercentage = ($incrementAmount / $previousSalary) * 100;

            $increment->previous_salary = $previousSalary;
            $increment->new_salary = $newSalary;
            $increment->increment_amount = $incrementAmount;
            $increment->increment_percentage = round($incrementPercentage, 2);
        }

        if ($request->has('effective_date')) {
            $increment->effective_date = $request->effective_date;
        }

        if ($request->has('reason')) {
            $increment->reason = $request->reason;
        }

        $increment->save();

        SystemLogger::log('info', "Increment ID {$id} updated");

        return response()->json([
            'success' => true,
            'message' => 'Increment record updated successfully',
            'data' => $increment->load(['user', 'approver']),
        ], 200);
    }

    public function destroy($id)
    {
        $increment = Increment::tenant()->findOrFail($id);

        if ($increment->status !== 'pending') {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete increment that has been processed',
            ], 400);
        }

        $increment->delete();

        SystemLogger::log('info', "Increment ID {$id} deleted");

        return response()->json([
            'success' => true,
            'message' => 'Increment record deleted successfully',
        ], 200);
    }

    public function approve(Request $request, $id)
    {
        $increment = Increment::tenant()->findOrFail($id);

        if ($increment->status !== 'pending') {
            return response()->json([
                'success' => false,
                'message' => 'Increment has already been processed',
            ], 400);
        }

        $increment->status = 'approved';
        $increment->approved_by = $request->user()->id;
        $increment->approved_at = Carbon::now();
        $increment->save();

        SystemLogger::log('info', "Increment ID {$id} approved by user ID {$request->user()->id}");

        return response()->json([
            'success' => true,
            'message' => 'Increment approved successfully',
            'data' => $increment->load(['user', 'approver']),
        ], 200);
    }

    public function reject(Request $request, $id)
    {
        $increment = Increment::tenant()->findOrFail($id);

        if ($increment->status !== 'pending') {
            return response()->json([
                'success' => false,
                'message' => 'Increment has already been processed',
            ], 400);
        }

        $increment->status = 'rejected';
        $increment->approved_by = $request->user()->id;
        $increment->approved_at = Carbon::now();
        $increment->save();

        SystemLogger::log('info', "Increment ID {$id} rejected by user ID {$request->user()->id}");

        return response()->json([
            'success' => true,
            'message' => 'Increment rejected',
            'data' => $increment->load(['user', 'approver']),
        ], 200);
    }

    public function implement($id)
    {
        $increment = Increment::tenant()->findOrFail($id);

        if ($increment->status !== 'approved') {
            return response()->json([
                'success' => false,
                'message' => 'Can only implement approved increments',
            ], 400);
        }

        $increment->status = 'implemented';
        $increment->save();

        SystemLogger::log('info', "Increment ID {$id} implemented");

        return response()->json([
            'success' => true,
            'message' => 'Increment implemented successfully',
            'data' => $increment->load(['user', 'approver']),
        ], 200);
    }
}
