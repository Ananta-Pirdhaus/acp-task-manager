<?php

namespace App\Services\Master;

use App\Models\User;
use App\Models\UserRole;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class UserService
{
    /**
     * Ambil data user semua dengan filter dan pagination
     *
     * @param array $filter
     * @param int $page
     * @param int $per_page
     * @param string $sort_field
     * @param string $sort_order
     * @return array
     */
    public static function getAllPaginate($filter = [], $page = 1, $per_page = 10, $sort_field = 'created_at', $sort_order = 'desc')
    {
        $query = User::query();

        if ($filter) {
            $query->when($filter['status'], function ($query) use ($filter) {
                $query->where('status', '=', $filter['status']);
            });
            $query->when($filter['role'], function ($query) use ($filter) {
                $query->whereHas('userRole', function ($query) use ($filter) {
                    $query->where('role_id', $filter['role']);
                });
            });
            $query->when($filter['search'], function ($query) use ($filter) {
                $query->where(function ($query) use ($filter) {
                    $query->orWhere(DB::raw('LOWER(name)'), 'like', "%" . strtolower($filter['search']) . "%");
                    $query->orWhere(DB::raw('LOWER(username)'), 'like', "%" . strtolower($filter['search']) . "%");
                });
            });
        }

        $query->when($sort_field, function ($q) use ($sort_field, $sort_order) {
            $q->orderBy($sort_field, $sort_order);
        });

        $query->with('userRole');

        $data = $query->paginate($per_page, ['*'], 'page', $page)->appends('per_page', $per_page);
        return [
            'status' => true,
            'data' => $data,
        ];
    }

    /**
     * Membuat user baru
     *
     * @param array $payload
     * @return array
     */
    public static function create($payload)
    {
        DB::beginTransaction();
        try {
            $validator = Validator::make($payload, [
                'name' => 'required|string|max:255',
                'username' => 'required|string|max:255|unique:users',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:8',
                'role' => 'required|array', 
            ]);

            if ($validator->fails()) {
                return [
                    'status' => false,
                    'errors' => $validator->errors(),
                ];
            }

            $user = User::create([
                'name' => $payload['name'],
                'username' => $payload['username'],
                'email' => $payload['email'],
                'password' => Hash::make($payload['password']),
                'status' => "ENABLE",
                'fail_login_count' => 0,
                'role_id' => $payload['role'][0],
                'created_at' => Carbon::now(),
                'created_by' => isset($payload['created_by']) ? $payload['created_by'] : 1,
            ]);

            DB::commit();

            return [
                'status' => true,
                'data'   => $user,
            ];
        } catch (\Throwable $th) {
            DB::rollBack();
            return [
                'status' => false,
                'errors' => $th->getMessage(),
            ];
        }
    }


    /**
     * Ambil data user berdasarkan ID
     *
     * @param $id
     * @return array
     */
    public static function getById($id): array
    {
        try {
            $data = User::with('userRole')->where("user_id", $id)->first();
            return [
                'status' => true,
                'data' => $data,
            ];
        } catch (\Throwable $th) {
            return [
                'status' => false,
                'errors' => $th->getMessage(),
            ];
        }
    }

    /**
     * Update data user
     *
     * @param array $payload
     * @param $id
     * @return array
     */
    public static function edit(array $payload, $id): array
    {
        DB::beginTransaction();
        try {
            $data = User::where('user_id', $id)->first();
            if (!$data) {
                return [
                    'status' => false,
                    'errors' => 'User not found',
                ];
            }

            $data->update([
                'name' => $payload['name'] ?? $data->name,
                'username' => $payload['username'] ?? $data->username,
                'password' => isset($payload['password']) ? Hash::make($payload['password']) : $data->password,
            ]);

            if (isset($payload['role'])) {
                self::assignRoles($payload['role'], $data->user_id);
            }

            DB::commit();
            return [
                'status' => true,
                'data' => $data,
            ];
        } catch (\Throwable $th) {
            DB::rollBack();
            return [
                'status' => false,
                'errors' => $th->getMessage(),
            ];
        }
    }

    /**
     * Assign roles ke user
     *
     * @param array $roles
     * @param $user_id
     * @return void
     */
    public static function assignRoles(array $roles, $user_id)
    {
        UserRole::where('user_id', $user_id)->delete();
        foreach ($roles as $role_id) {
            UserRole::create([
                'user_id' => $user_id,
                'role_id' => $role_id,
            ]);
        }
    }

    /**
     * Menghapus user berdasarkan ID
     *
     * @param $id
     * @return array
     */
    public static function delete($id)
    {
        DB::beginTransaction();
        try {
            $data = User::where("user_id", $id)->first();
            if (!$data) {
                return [
                    'status' => false,
                    'errors' => 'User not found',
                ];
            }

            $data->delete();
            DB::commit();
            return [
                'status' => true,
            ];
        } catch (\Throwable $th) {
            DB::rollBack();
            return [
                'status' => false,
                'errors' => $th->getMessage(),
            ];
        }
    }

    /**
     * Mengubah status user (ENABLE/DISABLE)
     *
     * @param $id
     * @param $status
     * @return array
     */
    public static function changeStatus($id, $status)
    {
        try {
            $user = User::where("user_id", $id)->first();
            if (!$user) {
                return [
                    'status' => false,
                    'errors' => 'User not found',
                ];
            }

            $user->update(['status' => strtoupper($status)]);
            return [
                'status' => true,
                'data' => $user,
            ];
        } catch (\Throwable $th) {
            return [
                'status' => false,
                'errors' => $th->getMessage(),
            ];
        }
    }
}
