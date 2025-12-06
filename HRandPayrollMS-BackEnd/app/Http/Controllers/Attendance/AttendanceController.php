<?php

namespace App\Http\Controllers\Attendance;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Attendance\Attendance;
use Illuminate\Support\Facades\Validator;
use App\Http\Helpers\SystemLogger;
use Carbon\Carbon;

class AttendanceController extends Controller
{
    public function index(Request $request)
    {
        $query = Attendance::tenant()->with('user');

        if ($request->filled('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        if ($request->filled('date')) {
            $query->whereDate('date', $request->date);
        }

        if ($request->filled('month') && $request->filled('year')) {
            $query->whereMonth('date', $request->month)
                  ->whereYear('date', $request->year);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $attendances = $query->orderBy('date', 'desc')->paginate(getPaginate());

        return response()->json([
            'success' => true,
            'data' => $attendances,
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'date' => 'required|date',
            'check_in' => 'nullable|date_format:H:i:s',
            'check_out' => 'nullable|date_format:H:i:s',
            'status' => 'required|in:present,absent,half_day,late,on_leave',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation Failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Calculate work hours if check_in and check_out are provided
        $workHours = 0;
        $overtimeHours = 0;
        if ($request->check_in && $request->check_out) {
            $checkIn = Carbon::parse($request->date . ' ' . $request->check_in);
            $checkOut = Carbon::parse($request->date . ' ' . $request->check_out);
            $totalHours = $checkOut->diffInHours($checkIn, true);
            $workHours = min($totalHours, 8);
            $overtimeHours = max($totalHours - 8, 0);
        }

        $attendance = Attendance::create([
            'user_id' => $request->user_id,
            'tenant_id' => tenant()->id,
            'date' => $request->date,
            'check_in' => $request->check_in ? Carbon::parse($request->date . ' ' . $request->check_in) : null,
            'check_out' => $request->check_out ? Carbon::parse($request->date . ' ' . $request->check_out) : null,
            'status' => $request->status,
            'work_hours' => $workHours,
            'overtime_hours' => $overtimeHours,
            'notes' => $request->notes,
        ]);

        SystemLogger::log('info', "Attendance recorded for user ID {$request->user_id} on {$request->date}");

        return response()->json([
            'success' => true,
            'message' => 'Attendance recorded successfully',
            'data' => $attendance->load('user'),
        ], 201);
    }

    public function show($id)
    {
        $attendance = Attendance::tenant()->with('user')->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $attendance,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'check_in' => 'nullable|date_format:H:i:s',
            'check_out' => 'nullable|date_format:H:i:s',
            'status' => 'nullable|in:present,absent,half_day,late,on_leave',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation Failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $attendance = Attendance::tenant()->findOrFail($id);

        // Calculate work hours if updating check times
        if ($request->has('check_in') || $request->has('check_out')) {
            $checkIn = $request->check_in ? Carbon::parse($attendance->date . ' ' . $request->check_in) : $attendance->check_in;
            $checkOut = $request->check_out ? Carbon::parse($attendance->date . ' ' . $request->check_out) : $attendance->check_out;

            if ($checkIn && $checkOut) {
                $totalHours = $checkOut->diffInHours($checkIn, true);
                $attendance->work_hours = min($totalHours, 8);
                $attendance->overtime_hours = max($totalHours - 8, 0);
            }

            if ($request->has('check_in')) {
                $attendance->check_in = $checkIn;
            }
            if ($request->has('check_out')) {
                $attendance->check_out = $checkOut;
            }
        }

        if ($request->has('status')) {
            $attendance->status = $request->status;
        }
        if ($request->has('notes')) {
            $attendance->notes = $request->notes;
        }

        $attendance->save();

        SystemLogger::log('info', "Attendance updated for ID {$id}");

        return response()->json([
            'success' => true,
            'message' => 'Attendance updated successfully',
            'data' => $attendance->load('user'),
        ], 200);
    }

    public function destroy($id)
    {
        $attendance = Attendance::tenant()->findOrFail($id);
        $attendance->delete();

        SystemLogger::log('info', "Attendance deleted for ID {$id}");

        return response()->json([
            'success' => true,
            'message' => 'Attendance deleted successfully',
        ], 200);
    }

    public function checkIn(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation Failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $today = Carbon::today();
        $attendance = Attendance::where('user_id', $request->user_id)
                                ->whereDate('date', $today)
                                ->first();

        if ($attendance && $attendance->check_in) {
            return response()->json([
                'success' => false,
                'message' => 'Already checked in today',
            ], 400);
        }

        if (!$attendance) {
            $attendance = Attendance::create([
                'user_id' => $request->user_id,
                'tenant_id' => tenant()->id,
                'date' => $today,
                'check_in' => Carbon::now(),
                'status' => 'present',
            ]);
        } else {
            $attendance->check_in = Carbon::now();
            $attendance->status = 'present';
            $attendance->save();
        }

        SystemLogger::log('info', "User ID {$request->user_id} checked in");

        return response()->json([
            'success' => true,
            'message' => 'Checked in successfully',
            'data' => $attendance,
        ], 200);
    }

    public function checkOut(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation Failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $today = Carbon::today();
        $attendance = Attendance::where('user_id', $request->user_id)
                                ->whereDate('date', $today)
                                ->first();

        if (!$attendance || !$attendance->check_in) {
            return response()->json([
                'success' => false,
                'message' => 'Please check in first',
            ], 400);
        }

        if ($attendance->check_out) {
            return response()->json([
                'success' => false,
                'message' => 'Already checked out today',
            ], 400);
        }

        $attendance->check_out = Carbon::now();
        $totalHours = $attendance->check_out->diffInHours($attendance->check_in, true);
        $attendance->work_hours = min($totalHours, 8);
        $attendance->overtime_hours = max($totalHours - 8, 0);
        $attendance->save();

        SystemLogger::log('info', "User ID {$request->user_id} checked out");

        return response()->json([
            'success' => true,
            'message' => 'Checked out successfully',
            'data' => $attendance,
        ], 200);
    }
}
