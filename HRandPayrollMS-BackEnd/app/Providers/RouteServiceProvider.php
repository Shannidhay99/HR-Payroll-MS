<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->routes(function () {
            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('routes/api.php'));

            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('routes/auth.php'));

            // Ensure all feature route files are loaded under /api
            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('routes/user.php'));

            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('routes/setting.php'));

            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('routes/system.php'));

            Route::middleware('web')
                ->group(base_path('routes/web.php'));
        });
    }
}
