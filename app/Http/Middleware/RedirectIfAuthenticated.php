<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
    public function handle(Request $request, Closure $next, ...$guards): Response
    {
        foreach ($guards as $guard) {
            if (Auth::guard($guard)->check()) {
                $user = Auth::user();
                switch ($user->role_id) {
                    case 1:
                        return redirect()->route('admin.dashboard');
                    case 2:
                        return redirect()->route('project_leader.dashboard');
                    case 3:
                        return redirect()->route('programming.dashboard');
                }
            }
        }

        return $next($request);
    }
}

