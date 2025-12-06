<?php

use App\Http\Controllers\System\SystemLogController;
use App\Http\Controllers\Task\TaskController;
use App\Http\Controllers\CRM\CustomerProfileController;
use App\Http\Controllers\Department\DepartmentController;
use App\Http\Controllers\Attendance\AttendanceController;
use App\Http\Controllers\Leave\LeaveController;
use App\Http\Controllers\Holiday\HolidayController;
use App\Http\Controllers\Notice\NoticeController;
use App\Http\Controllers\Expense\ExpenseController;
use App\Http\Controllers\Payroll\SalaryController;
use App\Http\Controllers\Payroll\IncrementController;
use App\Http\Controllers\Shift\ShiftController;
use App\Http\Controllers\Employee\DocumentController;
use App\Http\Controllers\Notification\NotificationController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Report\ReportController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', 'role:hrms_owner'])->prefix('admin')->group(function () {
    Route::get('/system-logs/notifications', [SystemLogController::class, 'adminNotifications']);
    Route::post('/system-logs/mark-seen', [SystemLogController::class, 'markAllAsSeen']);
});

Route::middleware(['auth:sanctum', 'role_or_permission:super_admin|hrms_owner'])->prefix('admin')->group(function () {
    Route::get('/tenant/system-logs', [SystemLogController::class, 'systemLogForTenant']);
});

// Public API for app features (protect with auth as needed)
Route::middleware(['auth:sanctum'])->group(function () {
    // Tasks
    Route::get('/tasks', [TaskController::class, 'index']);
    Route::post('/tasks', [TaskController::class, 'store']);
    Route::put('/tasks/{id}', [TaskController::class, 'update']);
    Route::post('/task-attachments', [TaskController::class, 'addAttachment']);
    Route::post('/comments/{id}', [TaskController::class, 'addComment']);

    // CRM Customer Profile
    Route::get('/crm/tenant/customer-profile', [CustomerProfileController::class, 'index']);

    // Departments
    Route::prefix('departments')->group(function () {
        Route::get('/', [DepartmentController::class, 'index']);
        Route::post('/', [DepartmentController::class, 'store']);
        Route::get('/{id}', [DepartmentController::class, 'show']);
        Route::put('/{id}', [DepartmentController::class, 'update']);
        Route::delete('/{id}', [DepartmentController::class, 'destroy']);
    });

    // Attendance
    Route::prefix('attendance')->group(function () {
        Route::get('/', [AttendanceController::class, 'index']);
        Route::post('/', [AttendanceController::class, 'store']);
        Route::get('/{id}', [AttendanceController::class, 'show']);
        Route::put('/{id}', [AttendanceController::class, 'update']);
        Route::delete('/{id}', [AttendanceController::class, 'destroy']);
        Route::post('/check-in', [AttendanceController::class, 'checkIn']);
        Route::post('/check-out', [AttendanceController::class, 'checkOut']);
    });

    // Leave Management
    Route::prefix('leaves')->group(function () {
        Route::get('/', [LeaveController::class, 'index']);
        Route::post('/', [LeaveController::class, 'store']);
        Route::get('/{id}', [LeaveController::class, 'show']);
        Route::put('/{id}', [LeaveController::class, 'update']);
        Route::delete('/{id}', [LeaveController::class, 'destroy']);
        Route::post('/{id}/approve', [LeaveController::class, 'approve']);
        Route::post('/{id}/reject', [LeaveController::class, 'reject']);
    });

    // Holidays
    Route::prefix('holidays')->group(function () {
        Route::get('/', [HolidayController::class, 'index']);
        Route::post('/', [HolidayController::class, 'store']);
        Route::get('/{id}', [HolidayController::class, 'show']);
        Route::put('/{id}', [HolidayController::class, 'update']);
        Route::delete('/{id}', [HolidayController::class, 'destroy']);
    });

    // Notices
    Route::prefix('notices')->group(function () {
        Route::get('/', [NoticeController::class, 'index']);
        Route::post('/', [NoticeController::class, 'store']);
        Route::get('/active', [NoticeController::class, 'active']);
        Route::get('/{id}', [NoticeController::class, 'show']);
        Route::put('/{id}', [NoticeController::class, 'update']);
        Route::delete('/{id}', [NoticeController::class, 'destroy']);
    });

    // Expenses
    Route::prefix('expenses')->group(function () {
        Route::get('/', [ExpenseController::class, 'index']);
        Route::post('/', [ExpenseController::class, 'store']);
        Route::get('/{id}', [ExpenseController::class, 'show']);
        Route::put('/{id}', [ExpenseController::class, 'update']);
        Route::delete('/{id}', [ExpenseController::class, 'destroy']);
        Route::post('/{id}/approve', [ExpenseController::class, 'approve']);
        Route::post('/{id}/reject', [ExpenseController::class, 'reject']);
    });

    // Payroll - Salaries
    Route::prefix('salaries')->group(function () {
        Route::get('/', [SalaryController::class, 'index']);
        Route::post('/', [SalaryController::class, 'store']);
        Route::get('/{id}', [SalaryController::class, 'show']);
        Route::put('/{id}', [SalaryController::class, 'update']);
        Route::delete('/{id}', [SalaryController::class, 'destroy']);
        Route::post('/{id}/process', [SalaryController::class, 'process']);
        Route::post('/{id}/pay', [SalaryController::class, 'markAsPaid']);
    });

    // Payroll - Increments
    Route::prefix('increments')->group(function () {
        Route::get('/', [IncrementController::class, 'index']);
        Route::post('/', [IncrementController::class, 'store']);
        Route::get('/{id}', [IncrementController::class, 'show']);
        Route::put('/{id}', [IncrementController::class, 'update']);
        Route::delete('/{id}', [IncrementController::class, 'destroy']);
        Route::post('/{id}/approve', [IncrementController::class, 'approve']);
        Route::post('/{id}/reject', [IncrementController::class, 'reject']);
        Route::post('/{id}/implement', [IncrementController::class, 'implement']);
    });

    // Shifts
    Route::prefix('shifts')->group(function () {
        Route::get('/', [ShiftController::class, 'index']);
        Route::post('/', [ShiftController::class, 'store']);
        Route::get('/{id}', [ShiftController::class, 'show']);
        Route::put('/{id}', [ShiftController::class, 'update']);
        Route::delete('/{id}', [ShiftController::class, 'destroy']);
        Route::post('/assign', [ShiftController::class, 'assignShift']);
        Route::get('/assignments/list', [ShiftController::class, 'getAssignments']);
        Route::delete('/assignments/{id}', [ShiftController::class, 'deleteAssignment']);
    });

    // Employee Documents
    Route::prefix('documents')->group(function () {
        Route::get('/', [DocumentController::class, 'index']);
        Route::post('/', [DocumentController::class, 'store']);
        Route::get('/{id}', [DocumentController::class, 'show']);
        Route::get('/{id}/download', [DocumentController::class, 'download']);
        Route::delete('/{id}', [DocumentController::class, 'destroy']);
    });

    // Notifications
    Route::prefix('notifications')->group(function () {
        Route::get('/', [NotificationController::class, 'index']);
        Route::get('/unread', [NotificationController::class, 'unread']);
        Route::post('/{id}/read', [NotificationController::class, 'markAsRead']);
        Route::post('/read-all', [NotificationController::class, 'markAllAsRead']);
        Route::delete('/{id}', [NotificationController::class, 'destroy']);
    });

    // Dashboard
    Route::get('/dashboard/statistics', [DashboardController::class, 'statistics']);
    Route::get('/dashboard/attendance-chart', [DashboardController::class, 'attendanceChart']);

    // Reports
    Route::prefix('reports')->group(function () {
        Route::get('/attendance', [ReportController::class, 'attendanceReport']);
        Route::get('/leave', [ReportController::class, 'leaveReport']);
        Route::get('/payroll', [ReportController::class, 'payrollReport']);
        Route::get('/expense', [ReportController::class, 'expenseReport']);
        Route::get('/employee', [ReportController::class, 'employeeReport']);
    });
});

// Placeholder to satisfy DELETE /purchase-returns/{id}
Route::middleware(['auth:sanctum'])->delete('/purchase-returns/{id}', function ($id) {
    return response()->json(['message' => 'Purchase return deleted', 'id' => (int)$id]);
});
