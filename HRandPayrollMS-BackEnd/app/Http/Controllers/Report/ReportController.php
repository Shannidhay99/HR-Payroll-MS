<?php

namespace App\Http\Controllers\Report;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User\User;
use App\Models\Attendance\Attendance;
use App\Models\Leave\Leave;
use App\Models\Expense\Expense;
use App\Models\Payroll\Salary;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function attendanceReport(Request $request)
    {
        $startDate = $request->input('start_date', Carbon::now()->startOfMonth());
        $endDate = $request->input('end_date', Carbon::now()->endOfMonth());
        $userId = $request->input('user_id');

        $query = Attendance::tenant()
            ->with('user')
            ->whereBetween('date', [$startDate, $endDate]);

        if ($userId) {
            $query->where('user_id', $userId);
        }

        $attendances = $query->orderBy('date', 'desc')->get();

        $summary = [
            'total_present' => $attendances->where('status', 'present')->count(),
            'total_absent' => $attendances->where('status', 'absent')->count(),
            'total_late' => $attendances->where('status', 'late')->count(),
            'total_half_day' => $attendances->where('status', 'half_day')->count(),
            'total_hours' => $attendances->sum('work_hours'),
            'total_overtime' => $attendances->sum('overtime_hours'),
        ];

        return response()->json([
            'success' => true,
            'data' => $attendances,
            'summary' => $summary,
        ], 200);
    }

    public function leaveReport(Request $request)
    {
        $startDate = $request->input('start_date', Carbon::now()->startOfYear());
        $endDate = $request->input('end_date', Carbon::now()->endOfYear());
        $userId = $request->input('user_id');

        $query = Leave::tenant()
            ->with('user')
            ->whereBetween('start_date', [$startDate, $endDate]);

        if ($userId) {
            $query->where('user_id', $userId);
        }

        $leaves = $query->orderBy('start_date', 'desc')->get();

        $summary = [
            'total_leaves' => $leaves->count(),
            'approved' => $leaves->where('status', 'approved')->count(),
            'pending' => $leaves->where('status', 'pending')->count(),
            'rejected' => $leaves->where('status', 'rejected')->count(),
            'total_days' => $leaves->where('status', 'approved')->sum('days'),
            'by_type' => $leaves->groupBy('leave_type')->map(function($items) {
                return $items->count();
            }),
        ];

        return response()->json([
            'success' => true,
            'data' => $leaves,
            'summary' => $summary,
        ], 200);
    }

    public function payrollReport(Request $request)
    {
        $month = $request->input('month', Carbon::now()->month);
        $year = $request->input('year', Carbon::now()->year);
        $userId = $request->input('user_id');

        $query = Salary::tenant()
            ->with('user')
            ->where('month', $month)
            ->where('year', $year);

        if ($userId) {
            $query->where('user_id', $userId);
        }

        $salaries = $query->orderBy('created_at', 'desc')->get();

        $summary = [
            'total_employees' => $salaries->count(),
            'total_basic_salary' => $salaries->sum('basic_salary'),
            'total_allowances' => $salaries->sum('allowances'),
            'total_deductions' => $salaries->sum('deductions'),
            'total_overtime' => $salaries->sum('overtime_pay'),
            'total_bonus' => $salaries->sum('bonus'),
            'total_net_salary' => $salaries->sum('net_salary'),
            'paid' => $salaries->where('status', 'paid')->count(),
            'pending' => $salaries->where('status', 'pending')->count(),
        ];

        return response()->json([
            'success' => true,
            'data' => $salaries,
            'summary' => $summary,
        ], 200);
    }

    public function expenseReport(Request $request)
    {
        $startDate = $request->input('start_date', Carbon::now()->startOfMonth());
        $endDate = $request->input('end_date', Carbon::now()->endOfMonth());
        $userId = $request->input('user_id');
        $category = $request->input('category');

        $query = Expense::tenant()
            ->with('user')
            ->whereBetween('date', [$startDate, $endDate]);

        if ($userId) {
            $query->where('user_id', $userId);
        }

        if ($category) {
            $query->where('category', $category);
        }

        $expenses = $query->orderBy('date', 'desc')->get();

        $summary = [
            'total_expenses' => $expenses->count(),
            'total_amount' => $expenses->sum('amount'),
            'approved_amount' => $expenses->where('status', 'approved')->sum('amount'),
            'pending_amount' => $expenses->where('status', 'pending')->sum('amount'),
            'rejected_amount' => $expenses->where('status', 'rejected')->sum('amount'),
            'by_category' => $expenses->groupBy('category')->map(function($items) {
                return [
                    'count' => $items->count(),
                    'amount' => $items->sum('amount'),
                ];
            }),
        ];

        return response()->json([
            'success' => true,
            'data' => $expenses,
            'summary' => $summary,
        ], 200);
    }

    public function employeeReport(Request $request)
    {
        $query = User::tenant()->with(['department', 'roles']);

        if ($request->filled('department_id')) {
            $query->where('department_id', $request->department_id);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $employees = $query->orderBy('created_at', 'desc')->get();

        $summary = [
            'total_employees' => $employees->count(),
            'by_status' => $employees->groupBy('status')->map(function($items) {
                return $items->count();
            }),
            'by_employment_type' => $employees->groupBy('employment_type')->map(function($items) {
                return $items->count();
            }),
            'by_department' => $employees->groupBy('department_id')->map(function($items) {
                return $items->count();
            }),
        ];

        return response()->json([
            'success' => true,
            'data' => $employees,
            'summary' => $summary,
        ], 200);
    }
}
