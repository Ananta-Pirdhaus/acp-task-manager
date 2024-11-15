<?php

namespace App\Http\Controllers\API\V1;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\Master\UserService;

class UserController extends Controller
{
    /**
     * Menampilkan daftar user dengan pagination
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $filter = $request->only('status', 'role', 'search');
        $page = $request->get('page', 1);
        $per_page = $request->get('per_page', 10);
        $sort_field = $request->get('sort_field', 'created_at');
        $sort_order = $request->get('sort_order', 'desc');

        $result = UserService::getAllPaginate($filter, $page, $per_page, $sort_field, $sort_order);

        if ($result['status']) {
            return response()->json($result);
        }

        return response()->json(['meta' => ['status' => 'failed', 'message' => 'Failed to fetch users']], 400);
    }

    /**
     * Membuat user baru
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $payload = $request->only('name', 'username', 'email', 'password', 'role');

        $result = UserService::create($payload);

        if ($result['status']) {
            return response()->json(['meta' => ['status' => 'success', 'message' => 'User created successfully'], 'data' => $result['data']], 201);
        }

        return response()->json(['meta' => ['status' => 'failed', 'message' => 'Create data unsuccessful'], 'data' => $result['errors']], 400);
    }

    /**
     * Menampilkan user berdasarkan ID
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $result = UserService::getById($id);

        if ($result['status']) {
            return response()->json($result);
        }

        return response()->json(['meta' => ['status' => 'failed', 'message' => 'User not found']], 404);
    }

    /**
     * Memperbarui data user
     *
     * @param Request $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $payload = $request->only('name', 'username', 'password', 'role', 'path_photo');

        $result = UserService::edit($payload, $id);

        if ($result['status']) {
            return response()->json(['meta' => ['status' => 'success', 'message' => 'User updated successfully'], 'data' => $result['data']]);
        }

        return response()->json(['meta' => ['status' => 'failed', 'message' => 'Update failed'], 'data' => $result['errors']], 400);
    }

    /**
     * Mengubah status user (ENABLE/DISABLE)
     *
     * @param $id
     * @param $status
     * @return \Illuminate\Http\JsonResponse
     */
    public function changeStatus($id, $status)
    {
        $result = UserService::changeStatus($id, $status);

        if ($result['status']) {
            return response()->json(['meta' => ['status' => 'success', 'message' => 'User status updated successfully'], 'data' => $result['data']]);
        }

        return response()->json(['meta' => ['status' => 'failed', 'message' => 'Status change failed'], 'data' => $result['errors']], 400);
    }

    /**
     * Menghapus user
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $result = UserService::delete($id);

        if ($result['status']) {
            return response()->json(['meta' => ['status' => 'success', 'message' => 'User deleted successfully']]);
        }

        return response()->json(['meta' => ['status' => 'failed', 'message' => 'Delete failed'], 'data' => $result['errors']], 400);
    }

    public function getAllUsers()
    {
        try {
            $users = User::all();
            return response()->json([
                'meta' => [
                    'status' => 'success',
                    'message' => 'Users retrieved successfully',
                    'code' => 200
                ],
                'data' => $users
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'meta' => [
                    'status' => 'failed',
                    'message' => 'Failed to retrieve users',
                    'code' => 500
                ],
                'data' => $e->getMessage()
            ], 500);
        }
    }
}

