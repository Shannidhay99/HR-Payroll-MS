<?php

use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user-profile', [UserController::class, 'profile']);
    // Alias to satisfy frontend expecting /user/profile
    Route::get('/user/profile', [UserController::class, 'profile']);
    Route::get('/users-manage', [UserController::class, 'manageUsers']);
    Route::post('/profile-image', [UserController::class, 'updateUserImage']);
    Route::apiResource('users', UserController::class);
});
