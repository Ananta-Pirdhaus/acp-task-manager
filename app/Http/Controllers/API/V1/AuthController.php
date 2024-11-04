<?php

namespace App\Http\Controllers\API\V1;

use Illuminate\Support\Facades\Log;
use App\Models\User;
use Illuminate\Http\Request;
use App\Helpers\ResponseFormatter;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Handle user registration.
     */
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role_id' => 'required|exists:roles,role_id',

        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'username' => $request->username,
            'password' => Hash::make($request->password),
            'role_id' => $request->role_id,
        ]);

        return redirect()->route('login')->with('success', 'Registrasi berhasil! Silakan login.');
    }

    /**
     * Handle user login.   
     */
    public function login(Request $request)
    {
        // Validasi input
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);


        if (Auth::attempt(['username' => $request->username, 'password' => $request->password])) {
            $user = Auth::user();
            Log::info('User logged in: ', ['username' => $request->username, 'role_id' => $user->role_id]);


            switch ($user->role_id) {
                case 1:
                    dd('Redirecting to admin dashboard');
                    return redirect()->route('admin.dashboard');
                case 2:
                    dd('Redirecting to project leader dashboard');
                    return redirect()->route('project_leader.dashboard');
                case 3:
                    dd('Redirecting to programming dashboard');
                    return redirect()->route('programming.dashboard');
                default:
                    dd('Redirecting to home');
                    return redirect()->route('home');
            }
        }

        return redirect()->back()->with('error', 'Login gagal. Username atau password salah.');
    }




    public function showLoginForm()
    {
        return view('auth.login');
    }

    public function showRegistrationForm()
    {
        return view('auth.register');
    }

    /**
     * Handle user logout.
     */
    public function logout(Request $request)
    {
        Auth::logout();
        return ResponseFormatter::success(null, 'Logout successful');
    }

    /**
     * Validate the user registration request.
     */
    private function validateRegistration(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|unique:users,username',
            'password' => 'required|string|min:6',
            'name' => 'required|string',
        ], [
            'required' => ':attribute harus diisi',
            'unique' => ':attribute sudah tersedia',
            'min' => ':attribute harus minimal :min karakter',
        ], [
            'username' => 'Username',
            'password' => 'Password',
            'name' => 'Nama',
        ]);

        if ($validator->fails()) {
            throw new \Illuminate\Validation\ValidationException($validator);
        }
    }

    /**
     * Validate the user login request.
     */
    private function validateLogin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'password' => 'required|string',
        ], [
            'required' => ':attribute harus diisi',
        ], [
            'username' => 'Username',
            'password' => 'Password',
        ]);

        if ($validator->fails()) {
            throw new \Illuminate\Validation\ValidationException($validator);
        }
    }
}
