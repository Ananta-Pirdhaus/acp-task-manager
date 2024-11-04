<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\API\V1\AuthController;
use App\Http\Controllers\ProgrammingController;
use App\Http\Controllers\ProjectLeaderController;
use App\Http\Middleware\RedirectBasedOnRole;

Route::middleware(['web'])->group(function () {
    Route::get('/', fn() => redirect()->route('login'))->middleware('guest')->name('home');

    Route::prefix('auth')->controller(AuthController::class)->group(function () {
        Route::get('/login', 'showLoginForm')->name('login');
        Route::post('/login', 'login');
        Route::get('/register', 'showRegistrationForm')->name('register');
        Route::post('/register', 'register');
        Route::post('/logout', 'logout')->name('logout');
    });


    Route::middleware(['auth'])->group(function () {
        Route::get('/admin/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
        Route::get('/project-leader/dashboard', [ProjectLeaderController::class, 'index'])->name('project_leader.dashboard');
        Route::get('/programming/dashboard', [ProgrammingController::class, 'index'])->name('programming.dashboard');
    });
});
