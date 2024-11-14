<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TaskTypeSeeder extends Seeder
{
    public function run()
    {
        $taskTypes = ['Todo', 'Doing', 'Done'];
        DB::table('task_types')->truncate();

        foreach ($taskTypes as $taskType) {
            if (!DB::table('task_types')->where('type', $taskType)->exists()) {
                DB::table('task_types')->insert([
                    'type' => $taskType,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
