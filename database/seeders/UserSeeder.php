<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        \App\Models\User::insert([
            [
                'username' => 'smartsoft',
                'email' => 'admin@smartsoft.com',
                'password' => bcrypt('admin'),
                'name' => 'Admin Smartsoft 1',
                'role_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'smartsoft2',
                'email' => 'admin2@smartsoft.com',
                'password' => bcrypt('admin'),
                'name' => 'Admin Smartsoft 2',
                'role_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'user',
                'email' => 'user@smartsoft.com',
                'password' => bcrypt('admin'),
                'name' => 'User',
                'role_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
