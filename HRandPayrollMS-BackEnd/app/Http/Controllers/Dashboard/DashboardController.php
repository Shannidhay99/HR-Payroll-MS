<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User\User;
use App\Models\Attendance\Attendance;
use App\Models\Leave\Leave;
use App\Models\Expense\Expense;
use App\Models\Payroll\Salary;
use App\Models\Department\Department;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function statistics(Request $request)
    {
        $tenantId = tenant()->id;
        $currentMonth = Carbon::now()->month;
        $currentYear = Carbon::now()->year;

        // Employee statistics
        $totalEmployees = User::tenant()->count();
        $activeEmployees = User::tenant()->where('status', 'active')->count();
        $newEmployeesThisMonth = User::tenant()
            ->whereMonth('created_at', $currentMonth)
            ->whereYear('created_at', $currentYear)
            ->count();

        // Attendance statistics
        $today = Carbon::today();
        $presentToday = Attendance::tenant()
            ->whereDate('date', $today)
            ->where('status', 'present')
            ->count();
        $absentToday = Attendance::tenant()
            ->whereDate('date', $today)
            ->where('status', 'absent')
            ->count();
        $lateToday = Attendance::tenant()
            ->whereDate('date', $today)
            ->where('status', 'late')
            ->count();

        // Leave statistics
        $pendingLeaves = Leave::tenant()->where('status', 'pending')->count();
        $approvedLeavesThisMonth = Leave::tenant()
            ->where('status', 'approved')
            ->whereMonth('start_date', $currentMonth)
            ->whereYear('start_date', $currentYear)
            ->count();

        // Expense statistics
        $pendingExpenses = Expense::tenant()->where('status', 'pending')->count();
        $totalExpensesThisMonth = Expense::tenant()
            ->whereMonth('date', $currentMonth)
            ->whereYear('date', $currentYear)
            ->sum('amount');

        // Payroll statistics
        $pendingSalaries = Salary::tenant()
            ->where('month', $currentMonth)
            ->where('year', $currentYear)
            ->where('status', 'pending')
            ->count();
        $totalPayrollThisMonth = Salary::tenant()
            ->where('month', $currentMonth)
            ->where('year', $currentYear)
            ->sum('net_salary');

        // Department statistics
        $totalDepartments = Department::tenant()->count();
        $departmentBreakdown = Department::tenant()
            ->withCount(['users' => function($query) {
                $query->where('tenant_id', tenant()->id);
            }])
            ->get()
            ->map(function($dept) {
                return [
                    'name' => $dept->name,
                    'count' => $dept->users_count ?? 0,
                ];
            });

        return response()->json([
            'success' => true,
            'data' => [
                'employees' => [
                    'total' => $totalEmployees,
                    'active' => $activeEmployees,
                    'new_this_month' => $newEmployeesThisMonth,
                ],
                'attendance' => [
                    'present_today' => $presentToday,
                    'absent_today' => $absentToday,
                    'late_today' => $lateToday,
                ],
                'leaves' => [
                    'pending' => $pendingLeaves,
                    'approved_this_month' => $approvedLeavesThisMonth,
                ],
                'expenses' => [
                    'pending' => $pendingExpenses,
                    'total_this_month' => (float) $totalExpensesThisMonth,
                ],
                'payroll' => [
                    'pending_salaries' => $pendingSalaries,
                    'total_payroll_this_month' => (float) $totalPayrollThisMonth,
                ],
                'departments' => [
                    'total' => $totalDepartments,
                    'breakdown' => $departmentBreakdown,
                ],
            ],
        ], 200);
    }

    public function attendanceChart(Request $request)
    {
        $days = $request->input('days', 7);
        $startDate = Carbon::now()->subDays($days - 1);

        $attendanceData = [];
        for ($i = 0; $i < $days; $i++) {
            $date = $startDate->copy()->addDays($i);
            $present = Attendance::tenant()
                ->whereDate('date', $date)
                ->where('status', 'present')
                ->count();
            $absent = Attendance::tenant()
                ->whereDate('date', $date)
                ->where('status', 'absent')
                ->count();
            $late = Attendance::tenant()
                ->whereDate('date', $date)
                ->where('status', 'late')
                ->count();

            $attendanceData[] = [
                'date' => $date->format('Y-m-d'),
                'present' => $present,
                'absent' => $absent,
                'late' => $late,
            ];
        }

        return response()->json([
            'success' => true,
            'data' => $attendanceData,
        ], 200);
    }
}
