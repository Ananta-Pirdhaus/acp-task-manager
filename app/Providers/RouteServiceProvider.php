<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to your application's "home" route.
     *
     * Typically, users are redirected here after authentication.
     *
     * @var string
     */
    public const HOME = '/home';

    /**
     * Define your route model bindings, pattern filters, and other route configuration.
     */
    public function boot(): void
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });

        $this->routes(function () {
            // This handles API routes
            Route::middleware('api')
                ->prefix('api')
                ->namespace(self::API_NAMESPACE)  // Use the correct constant reference here
                ->group(base_path('routes/api.php'));

            // This handles web routes
            Route::middleware('web')
                ->group(base_path('routes/web.php'));
        });
    }

    /**
     * Define the namespace for API controllers.
     *
     * @var string
     */
    public const API_NAMESPACE = 'App\\Http\\Controllers\\API\\V1';

    /**
     * Define the routes for the application.
     */
    public function map()
    {
        // Simply call the method to map API routes
        $this->mapApiRoutes();
    }

    /**
     * Map the API routes.
     */
    protected function mapApiRoutes()
    {
        // Ensure the routes are mapped correctly with the API namespace
        Route::prefix('api')
            ->middleware('api')
            ->namespace(self::API_NAMESPACE)  // Correct constant reference
            ->group(base_path('routes/api.php'));
    }
}
