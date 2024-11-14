<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Priority;

class PrioritySeeder extends Seeder
{
    public function run()
    {
        $priorities = ['high', 'medium', 'low'];

        foreach ($priorities as $priority) {
            Priority::create(['priority' => $priority]);
        }
    }
}
