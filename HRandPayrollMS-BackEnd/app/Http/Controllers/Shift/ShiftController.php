<?php

namespace App\Http\Controllers\Shift;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Shift\Shift;
use App\Models\Shift\ShiftAssignment;
use Illuminate\Support\Facades\Validator;
use App\Http\Helpers\SystemLogger;

class ShiftController extends Controller
{
    public function index(Request $request)
    {
        $query = Shift::tenant();

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $shifts = $query->paginate(getPaginate());

        return response()->json([
            'success' => true,
            'data' => $shifts,
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i',
            'break_duration' => 'nullable|integer|min:0',
            'working_hours' => 'required|numeric|min:0',
            'days_of_week' => 'nullable|array',
            'status' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation Failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $shift = Shift::create([
            'tenant_id' => tenant()->id,
            'name' => $request->name,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'break_duration' => $request->break_duration ?? 0,
            'working_hours' => $request->working_hours,
            'days_of_week' => $request->days_of_week,
            'status' => $request->status ?? true,
        ]);

        SystemLogger::log('info', "Shift created: {$shift->name}");

        return response()->json([
            'success' => true,
            'message' => 'Shift created successfully',
            'data' => $shift,
        ], 201);
    }

    public function show($id)
    {
        $shift = Shift::tenant()->with('assignments.user')->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $shift,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i',
            'break_duration' => 'nullable|integer|min:0',
            'working_hours' => 'required|numeric|min:0',
            'days_of_week' => 'nullable|array',
            'status' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation Failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $shift = Shift::tenant()->findOrFail($id);
        $shift->update($request->all());

        SystemLogger::log('info', "Shift updated: {$shift->name}");

        return response()->json([
            'success' => true,
            'message' => 'Shift updated successfully',
            'data' => $shift,
        ], 200);
    }

    public function destroy($id)
    {
        $shift = Shift::tenant()->findOrFail($id);
        $shift->delete();

        SystemLogger::log('info', "Shift deleted: {$shift->name}");

        return response()->json([
            'success' => true,
            'message' => 'Shift deleted successfully',
        ], 200);
    }

    public function assignShift(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'shift_id' => 'required|exists:shifts,id',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'is_permanent' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation Failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $assignment = ShiftAssignment::create([
            'tenant_id' => tenant()->id,
            'user_id' => $request->user_id,
            'shift_id' => $request->shift_id,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'is_permanent' => $request->is_permanent ?? false,
            'status' => 'active',
        ]);

        SystemLogger::log('info', "Shift assigned to user ID {$request->user_id}");

        return response()->json([
            'success' => true,
            'message' => 'Shift assigned successfully',
            'data' => $assignment->load(['user', 'shift']),
        ], 201);
    }

    public function getAssignments(Request $request)
    {
        $query = ShiftAssignment::tenant()->with(['user', 'shift']);

        if ($request->filled('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        if ($request->filled('shift_id')) {
            $query->where('shift_id', $request->shift_id);
        }

        $assignments = $query->paginate(getPaginate());

        return response()->json([
            'success' => true,
            'data' => $assignments,
        ], 200);
    }

    public function deleteAssignment($id)
    {
        $assignment = ShiftAssignment::tenant()->findOrFail($id);
        $assignment->delete();

        SystemLogger::log('info', "Shift assignment deleted: ID {$id}");

        return response()->json([
            'success' => true,
            'message' => 'Shift assignment deleted successfully',
        ], 200);
    }
}
