<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        \App\Models\User::insert([
            [
                'username' => 'admin',
                'email' => 'admin@gmail.com',
                'password' => bcrypt('admin123'),
                'name' => 'admin',
                'role_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'user1',
                'email' => 'user1@gmail.com',
                'password' => bcrypt('user1123'),
                'name' => 'user1',
                'role_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'user2',
                'email' => 'user2@gmail.com',
                'password' => bcrypt('user2123'),
                'name' => 'user2',
                'role_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
