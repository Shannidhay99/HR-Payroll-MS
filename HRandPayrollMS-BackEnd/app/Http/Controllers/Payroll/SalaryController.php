<?php

namespace App\Http\Controllers\Payroll;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Payroll\Salary;
use Illuminate\Support\Facades\Validator;
use App\Http\Helpers\SystemLogger;
use Carbon\Carbon;

class SalaryController extends Controller
{
    public function index(Request $request)
    {
        $query = Salary::tenant()->with('user');

        if ($request->filled('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        if ($request->filled('month')) {
            $query->where('month', $request->month);
        }

        if ($request->filled('year')) {
            $query->where('year', $request->year);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $salaries = $query->orderBy('year', 'desc')
                         ->orderBy('month', 'desc')
                         ->paginate(getPaginate());

        return response()->json([
            'success' => true,
            'data' => $salaries,
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'month' => 'required|integer|min:1|max:12',
            'year' => 'required|integer|min:2000',
            'basic_salary' => 'required|numeric|min:0',
            'allowances' => 'nullable|numeric|min:0',
            'deductions' => 'nullable|numeric|min:0',
            'overtime_pay' => 'nullable|numeric|min:0',
            'bonus' => 'nullable|numeric|min:0',
            'payment_method' => 'nullable|in:bank_transfer,cash,cheque',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation Failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Check if salary already exists for this user and month/year
        $existing = Salary::tenant()
            ->where('user_id', $request->user_id)
            ->where('month', $request->month)
            ->where('year', $request->year)
            ->first();

        if ($existing) {
            return response()->json([
                'success' => false,
                'message' => 'Salary record already exists for this period',
            ], 400);
        }

        $basicSalary = $request->basic_salary;
        $allowances = $request->allowances ?? 0;
        $deductions = $request->deductions ?? 0;
        $overtimePay = $request->overtime_pay ?? 0;
        $bonus = $request->bonus ?? 0;

        $netSalary = $basicSalary + $allowances + $overtimePay + $bonus - $deductions;

        $salary = Salary::create([
            'user_id' => $request->user_id,
            'tenant_id' => tenant()->id,
            'month' => $request->month,
            'year' => $request->year,
            'basic_salary' => $basicSalary,
            'allowances' => $allowances,
            'deductions' => $deductions,
            'overtime_pay' => $overtimePay,
            'bonus' => $bonus,
            'net_salary' => $netSalary,
            'status' => 'pending',
            'payment_method' => $request->payment_method ?? 'bank_transfer',
            'notes' => $request->notes,
        ]);

        SystemLogger::log('info', "Salary record created for user ID {$request->user_id} for {$request->month}/{$request->year}");

        return response()->json([
            'success' => true,
            'message' => 'Salary record created successfully',
            'data' => $salary->load('user'),
        ], 201);
    }

    public function show($id)
    {
        $salary = Salary::tenant()->with('user')->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $salary,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $salary = Salary::tenant()->findOrFail($id);

        if ($salary->status === 'paid') {
            return response()->json([
                'success' => false,
                'message' => 'Cannot update salary that has been paid',
            ], 400);
        }

        $validator = Validator::make($request->all(), [
            'basic_salary' => 'nullable|numeric|min:0',
            'allowances' => 'nullable|numeric|min:0',
            'deductions' => 'nullable|numeric|min:0',
            'overtime_pay' => 'nullable|numeric|min:0',
            'bonus' => 'nullable|numeric|min:0',
            'payment_method' => 'nullable|in:bank_transfer,cash,cheque',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation Failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $salary->update($request->only(['basic_salary', 'allowances', 'deductions', 'overtime_pay', 'bonus', 'payment_method', 'notes']));

        // Recalculate net salary
        $salary->net_salary = $salary->basic_salary + $salary->allowances + $salary->overtime_pay + $salary->bonus - $salary->deductions;
        $salary->save();

        SystemLogger::log('info', "Salary record ID {$id} updated");

        return response()->json([
            'success' => true,
            'message' => 'Salary record updated successfully',
            'data' => $salary->load('user'),
        ], 200);
    }

    public function destroy($id)
    {
        $salary = Salary::tenant()->findOrFail($id);

        if ($salary->status === 'paid') {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete salary that has been paid',
            ], 400);
        }

        $salary->delete();

        SystemLogger::log('info', "Salary record ID {$id} deleted");

        return response()->json([
            'success' => true,
            'message' => 'Salary record deleted successfully',
        ], 200);
    }

    public function process($id)
    {
        $salary = Salary::tenant()->findOrFail($id);

        if ($salary->status !== 'pending') {
            return response()->json([
                'success' => false,
                'message' => 'Salary has already been processed',
            ], 400);
        }

        $salary->status = 'processed';
        $salary->save();

        SystemLogger::log('info', "Salary record ID {$id} processed");

        return response()->json([
            'success' => true,
            'message' => 'Salary processed successfully',
            'data' => $salary->load('user'),
        ], 200);
    }

    public function markAsPaid(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'paid_date' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation Failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $salary = Salary::tenant()->findOrFail($id);

        $salary->status = 'paid';
        $salary->paid_date = $request->paid_date;
        $salary->save();

        SystemLogger::log('info', "Salary record ID {$id} marked as paid");

        return response()->json([
            'success' => true,
            'message' => 'Salary marked as paid successfully',
            'data' => $salary->load('user'),
        ], 200);
    }
}
