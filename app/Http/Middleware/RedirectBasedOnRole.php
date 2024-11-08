<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class RedirectBasedOnRole
{
    /**
     * Handle an incoming request.
     */
    public function handle($request, Closure $next)
    {
        if (auth()->check()) {
            $user = auth()->user();

            switch ($user->role_id) {
                case 1:
                    return redirect()->route('admin.dashboard');
                case 2:
                    return redirect()->route('project_leader.dashboard');
                case 3:
                    return redirect()->route('programming.dashboard');
                default:
                    return redirect()->route('home');
            }
        }

        return $next($request);
    }
}
