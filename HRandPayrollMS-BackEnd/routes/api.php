<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Setting\GeneralSettingController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\System\SystemLogController;
use App\Http\Controllers\Tenant\TenantController;

// Auth Routes
Route::prefix('auth')->group(function () {
    Route::get('login-google', [AuthController::class, 'loginWithGoogle']);
    Route::get('google/callback', [AuthController::class, 'loginWithGoogle']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('update-profile', [AuthController::class, 'updateProfile'])->middleware('auth:sanctum');
});

Route::post('change-password', [AuthController::class, 'changePassword']);

// Admin Routes
Route::prefix('admin')->group(function () {
    Route::post('gs', [GeneralSettingController::class, 'setting']);
    
    // System Logs
    Route::prefix('system-logs')->group(function () {
        Route::post('mark-seen', [SystemLogController::class, 'markAsSeen']);
        Route::get('notifications', [SystemLogController::class, 'notifications']);
    });
    
    Route::prefix('tenant')->group(function () {
        Route::get('system-logs', [SystemLogController::class, 'systemLogs']);
    });
});

// General Settings
Route::get('/generalsetting', [GeneralSettingController::class, 'setting']);
Route::post('/generalsetting', [GeneralSettingController::class, 'setting']);

// Tenant Routes
Route::prefix('tenants')->group(function () {
    Route::get('/', [TenantController::class, 'index']);
    Route::get('/{id}', [TenantController::class, 'show']);
});

/*
// General Settings Routes
Route::prefix('settings')->group(function () {
    Route::get('general', [GeneralSettingController::class, 'index']);
    Route::post('general', [GeneralSettingController::class, 'setting']);
});
*/


