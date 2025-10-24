<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Setting\GeneralSettingController;

//Route
Route::get('/generalsetting', [GeneralSettingController::class, 'setting']);
Route::post('/generalsetting', [GeneralSettingController::class, 'setting']);

/*
// General Settings Routes
Route::prefix('settings')->group(function () {
    Route::get('general', [GeneralSettingController::class, 'index']);
    Route::post('general', [GeneralSettingController::class, 'setting']);
});
*/


