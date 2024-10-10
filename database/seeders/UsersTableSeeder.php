<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        if (!User::where('username', 'userone')->exists()) {
            User::create([
                'name' => 'User One',
                'username' => 'userone',
                'password' => Hash::make('password'),
                'path_photo' => 'path/to/photo1.jpg',
                'status' => 'ENABLE',
                'fail_login_count' => 0,
                'created_by' => null,
                'updated_by' => null,
            ]);
        }

        if (!User::where('username', 'usertwo')->exists()) {
            User::create([
                'name' => 'User Two',
                'username' => 'usertwo',
                'password' => Hash::make('password'),
                'path_photo' => 'path/to/photo2.jpg',
                'status' => 'ENABLE',
                'fail_login_count' => 0,
                'created_by' => null,
                'updated_by' => null,
            ]);
        }

        if (!User::where('username', 'userthree')->exists()) {
            User::create([
                'name' => 'User Three',
                'username' => 'userthree',
                'password' => Hash::make('password'),
                'path_photo' => 'path/to/photo3.jpg',
                'status' => 'ENABLE',
                'fail_login_count' => 0,
                'created_by' => null,
                'updated_by' => null,
            ]);
        }

        if (!User::where('username', 'userfour')->exists()) {
            User::create([
                'name' => 'User Four',
                'username' => 'userfour',
                'password' => Hash::make('password'),
                'path_photo' => 'path/to/photo4.jpg',
                'status' => 'ENABLE',
                'fail_login_count' => 0,
                'created_by' => null,
                'updated_by' => null,
            ]);
        }
    }
}
