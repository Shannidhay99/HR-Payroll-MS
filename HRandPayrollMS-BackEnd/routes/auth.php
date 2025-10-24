<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('/auth/refresh', [AuthController::class, 'refresh']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
// Password flows expected by frontend
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);
Route::post('/change-password', [AuthController::class, 'changePassword']);
// Optional social login expected by frontend
Route::post('/auth/login-google', [AuthController::class, 'loginWithGoogle']);

Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
