<?php

namespace App\Http\Controllers\Leave;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Leave\Leave;
use Illuminate\Support\Facades\Validator;
use App\Http\Helpers\SystemLogger;
use Carbon\Carbon;

class LeaveController extends Controller
{
    public function index(Request $request)
    {
        $query = Leave::tenant()->with(['user', 'approver']);

        if ($request->filled('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('leave_type')) {
            $query->where('leave_type', $request->leave_type);
        }

        $leaves = $query->orderBy('created_at', 'desc')->paginate(getPaginate());

        return response()->json([
            'success' => true,
            'data' => $leaves,
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'leave_type' => 'required|in:sick,casual,annual,maternity,paternity,unpaid',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'reason' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation Failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $startDate = Carbon::parse($request->start_date);
        $endDate = Carbon::parse($request->end_date);
        $days = $startDate->diffInDays($endDate) + 1;

        $leave = Leave::create([
            'user_id' => $request->user_id,
            'tenant_id' => tenant()->id,
            'leave_type' => $request->leave_type,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'days' => $days,
            'reason' => $request->reason,
            'status' => 'pending',
        ]);

        SystemLogger::log('info', "Leave application created by user ID {$request->user_id}");

        return response()->json([
            'success' => true,
            'message' => 'Leave application submitted successfully',
            'data' => $leave->load(['user', 'approver']),
        ], 201);
    }

    public function show($id)
    {
        $leave = Leave::tenant()->with(['user', 'approver'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $leave,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $leave = Leave::tenant()->findOrFail($id);

        if ($leave->status !== 'pending') {
            return response()->json([
                'success' => false,
                'message' => 'Cannot update leave application that has been processed',
            ], 400);
        }

        $validator = Validator::make($request->all(), [
            'leave_type' => 'nullable|in:sick,casual,annual,maternity,paternity,unpaid',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'reason' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation Failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        if ($request->has('start_date') || $request->has('end_date')) {
            $startDate = Carbon::parse($request->start_date ?? $leave->start_date);
            $endDate = Carbon::parse($request->end_date ?? $leave->end_date);
            $leave->days = $startDate->diffInDays($endDate) + 1;
        }

        $leave->update($request->only(['leave_type', 'start_date', 'end_date', 'reason']));

        SystemLogger::log('info', "Leave application ID {$id} updated");

        return response()->json([
            'success' => true,
            'message' => 'Leave application updated successfully',
            'data' => $leave->load(['user', 'approver']),
        ], 200);
    }

    public function destroy($id)
    {
        $leave = Leave::tenant()->findOrFail($id);

        if ($leave->status !== 'pending') {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete leave application that has been processed',
            ], 400);
        }

        $leave->delete();

        SystemLogger::log('info', "Leave application ID {$id} deleted");

        return response()->json([
            'success' => true,
            'message' => 'Leave application deleted successfully',
        ], 200);
    }

    public function approve(Request $request, $id)
    {
        $leave = Leave::tenant()->findOrFail($id);

        if ($leave->status !== 'pending') {
            return response()->json([
                'success' => false,
                'message' => 'Leave application has already been processed',
            ], 400);
        }

        $leave->status = 'approved';
        $leave->approved_by = $request->user()->id;
        $leave->approved_at = Carbon::now();
        $leave->save();

        SystemLogger::log('info', "Leave application ID {$id} approved by user ID {$request->user()->id}");

        return response()->json([
            'success' => true,
            'message' => 'Leave application approved successfully',
            'data' => $leave->load(['user', 'approver']),
        ], 200);
    }

    public function reject(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'rejection_reason' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation Failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $leave = Leave::tenant()->findOrFail($id);

        if ($leave->status !== 'pending') {
            return response()->json([
                'success' => false,
                'message' => 'Leave application has already been processed',
            ], 400);
        }

        $leave->status = 'rejected';
        $leave->approved_by = $request->user()->id;
        $leave->approved_at = Carbon::now();
        $leave->rejection_reason = $request->rejection_reason;
        $leave->save();

        SystemLogger::log('info', "Leave application ID {$id} rejected by user ID {$request->user()->id}");

        return response()->json([
            'success' => true,
            'message' => 'Leave application rejected',
            'data' => $leave->load(['user', 'approver']),
        ], 200);
    }
}
