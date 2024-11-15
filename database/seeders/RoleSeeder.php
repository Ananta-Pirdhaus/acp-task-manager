<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\User;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::first();

        if ($admin) {
            $roles = Role::pluck('role_name')->toArray();
            if (!in_array("Administrator", $roles)) {
                Role::create([
                    'role_name' => "Administrator",
                    'role_description' => 'Role ini bertindak sebagai Administrator.',
                    'created_by' => $admin->user_id,
                    'updated_by' => $admin->user_id,
                ]);
            }

            if (!in_array("Project Leader", $roles)) {
                Role::create([
                    'role_name' => "Project Leader",
                    'role_description' => 'Role ini bertindak sebagai Asisten Proyek.',
                    'created_by' => $admin->user_id,
                    'updated_by' => $admin->user_id,
                ]);
            }

            if (!in_array("Programming", $roles)) {
                Role::create([
                    'role_name' => "Programming",
                    'role_description' => 'Role ini bertindak sebagai Programmer.',
                    'created_by' => $admin->user_id,
                    'updated_by' => $admin->user_id,
                ]);
            }
        } else {
            echo "Error: Tidak ada data user. Silakan jalankan UserSeeder terlebih dahulu.\n";
        }
    }
}
