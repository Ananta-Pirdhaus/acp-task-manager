<?php

namespace App\Http\Middleware;

use App\Helpers\ResponseFormatter;
use App\Models\RolePermission;
use Closure;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;

class JWtMiddleware
{
    public function handle(Request $request, Closure $next, $permission = ""): Response
    {
        try {
            $userModel = JWTAuth::parseToken()->authenticate();
            $roleActive = JWTAuth::parseToken()->getPayload()->get('role_active');
            if (!empty($permission) && !RolePermission::isHasPermission($roleActive['role_id'], $permission)) {
                return ResponseFormatter::error(null, 'Anda tidak memiliki permission untuk mengakses ini', 403);
            }
        } catch (TokenInvalidException $e) {
            return ResponseFormatter::error(null, "Token tidak valid: " . $e->getMessage(), 403);
        } catch (TokenExpiredException $e) {
            return ResponseFormatter::error(null, "Token expired", 403);
        } catch (Exception $e) {
            return ResponseFormatter::error(null, "Silahkan login terlebih dahulu: " . $e->getMessage(), 403);
        }
        return $next($request);
    }
}
