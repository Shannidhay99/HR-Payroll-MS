<?php

use App\Http\Controllers\Setting\GeneralSettingController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->group(function () {
    Route::post('/gs', [GeneralSettingController::class, 'setting']);
});

