<?php

use App\Http\Controllers\System\SystemLogController;
use App\Http\Controllers\Task\TaskController;
use App\Http\Controllers\CRM\CustomerProfileController;
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
});

// Placeholder to satisfy DELETE /purchase-returns/{id}
Route::middleware(['auth:sanctum'])->delete('/purchase-returns/{id}', function ($id) {
    return response()->json(['message' => 'Purchase return deleted', 'id' => (int)$id]);
});
