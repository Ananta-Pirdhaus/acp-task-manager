<?php

namespace App\Http\Controllers\API\V1;

use App\Models\User;
use Illuminate\Http\Request;
use App\Helpers\ResponseFormatter;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Handle user registration.
     */
    public function register(Request $request)
    {
        Log::info('Register method called');
        if (strlen($request->password) < 8) {
            return response()->json(['message' => 'Password kurang dari 8 karakter'], 400);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'username' => 'required|string|max:255|unique:users',
            'role_id' => 'required|exists:roles,role_id',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'username' => $request->username,
            'password' => Hash::make($request->password),
            'role_id' => $request->role_id,
        ]);


        return response()->json([
            'message' => 'Registration successful',
            'user' => [
                'user_id' => $user->user_id,
                'name' => $user->name,
                'username' => $user->username,
                'email' => $user->email,
                'role' => $user->role,
            ],
        ], 201);
    }


    /**
     * Handle user login.   
     */
    public function login(Request $request)
    {
        Log::info('Login method called');
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ], [
            'email.required' => 'Email is required.',
            'email.email' => 'Please provide a valid email address.',
            'password.required' => 'Password is required.',
        ]);

        $user = User::where('email', $request->email)->first();
        if (!$user) {
            Log::warning('User not found for email: ' . $request->email);
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
        if (!Hash::check($request->password, $user->password)) {
            Log::warning('Invalid password for email: ' . $request->email);
            return response()->json(['message' => 'emai atau password salah'], 401);
        }

        $token = $user->createToken('YourAppName')->plainTextToken;
        Log::info('Token generated for user: ' . $user->email);

        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'user' => [
                'user_id' => $user->user_id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ],
        ], 200);
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
        $request->user()->currentAccessToken()->delete();
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
