<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\User;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::first();

        if ($admin) {
            Role::create([
                'role_name' => "Administrator",
                'role_description' => 'Role ini bertindak sebagai Administrator.',
                'created_by' => $admin->id,
                'updated_by' => $admin->id,
            ]);

            Role::create([
                'role_name' => "Project Leader",
                'role_description' => 'Role ini bertindak sebagai Asisten Proyek.',
                'created_by' => $admin->id,
                'updated_by' => $admin->id,
            ]);

            Role::create([
                'role_name' => "Programming",
                'role_description' => 'Role ini bertindak sebagai Programmer.',
                'created_by' => $admin->id,
                'updated_by' => $admin->id,
            ]);
        } else {
            echo "Error: Tidak ada data user. Silakan jalankan UserSeeder terlebih dahulu.\n";
        }
    }
}
