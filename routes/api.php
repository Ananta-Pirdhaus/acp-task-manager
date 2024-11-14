<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\V1\AuthController;
use App\Http\Controllers\API\V1\MenuController;
use App\Http\Controllers\API\V1\RoleController;
use App\Http\Controllers\API\V1\TaskController;
use App\Http\Controllers\API\V1\UserController;
use App\Http\Controllers\API\V1\ConfigController;
use App\Http\Controllers\API\V1\ReferenceController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::get('/test', function () {
    return response()->json(['message' => 'Test berhasil']);
});

Route::prefix('v1')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::get('/konfig-login', [ConfigController::class, 'konfig_login']);
        Route::post('/login', [AuthController::class, 'login'])->name('api.auth.login');
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('forgot-password', [AuthController::class, 'forgotPassword']);
    });

    Route::prefix('users')->group(function () {
        Route::get('user', [UserController::class, 'getAllUsers']);
        Route::post('/', [UserController::class, 'store']);
        Route::put('/{id}', [UserController::class, 'update']);
        Route::delete('/{id}', [UserController::class, 'destroy']);
    });

    Route::prefix('roles')->group(function () {
        Route::get('/', [RoleController::class, 'index']);
        Route::post('/', [RoleController::class, 'store'])->middleware(['auth:sanctum']);
        Route::get('/{id}', [RoleController::class, 'show'])->middleware(['auth:sanctum']);
        Route::put('/{id}', [RoleController::class, 'update'])->middleware(['auth:sanctum']);
        Route::put('/{id}/update-akses', [RoleController::class, 'updateRoleAkses'])->middleware(['auth.api:role_update']);
        Route::delete('/{id}', [RoleController::class, 'destroy'])->middleware(['auth:sanctum']);
        Route::put('/{id}/{status}', [RoleController::class, 'changeStatus'])->middleware(['auth:sanctum']);
        Route::get('/{id}/checkout', [RoleController::class, 'changeRole'])->middleware(['auth:sanctum']);
    });


    Route::prefix('menu')->group(function () {
        Route::get('/', [MenuController::class, 'index'])->middleware(['auth.api:menu_master_read']);
        Route::post('/', [MenuController::class, 'store'])->middleware(['auth.api:menu_master_create']);
        Route::get('/order', [MenuController::class, 'getOrder'])->middleware(['auth.api:menu_master_read']);
        Route::put('/order', [MenuController::class, 'updateOrder'])->middleware(['auth.api:menu_master_update']);
        Route::get('/{id}', [MenuController::class, 'show'])->middleware(['auth.api:menu_master_read']);
        Route::put('/{id}', [MenuController::class, 'update'])->middleware(['auth.api:menu_master_update']);
        Route::delete('/{id}', [MenuController::class, 'destroy'])->middleware(['auth.api:menu_master_delete']);
        Route::put('/{id}/{status}', [MenuController::class, 'changeStatus'])->middleware(['auth.api:menu_master_update']);
    });

    Route::prefix('config')->group(function () {
        Route::get('/', [ConfigController::class, 'index'])->middleware(['auth.api:konfigurasi_read']);
        Route::get('/array-all', [ConfigController::class, 'config_array_all'])->middleware(['auth.api:konfigurasi_read']);
        Route::post('/referensi-upload', [ConfigController::class, 'referensiUpload'])->middleware(['auth.api']);
        Route::put('/', [ConfigController::class, 'update'])->middleware(['auth.api:konfigurasi_update']);
    });

    Route::prefix('reference')->group(function () {
        Route::get('/get-role-option', [ReferenceController::class, 'getRoleOption'])->middleware(['auth.api']);
        Route::get('/get-menu-access', [ReferenceController::class, 'getMenuAccess'])->middleware(['auth.api']);
    });

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('tasks', [TaskController::class, 'index']);
        Route::post('tasks', [TaskController::class, 'store']);
        Route::get('tasks', [TaskController::class, 'show']);
        Route::put('tasks/{id}', [TaskController::class, 'update']);
        Route::delete('tasks/{id}', [TaskController::class, 'destroy']);
    });
});
