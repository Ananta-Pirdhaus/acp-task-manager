<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory, HasUuids;
    use HasFactory;

    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';
    // const TASK_TYPE_TODO = 'todo';
    // const TASK_TYPE_IN_PROGRESS = 'in_progress';
    // const TASK_TYPE_DONE = 'done';

    protected $fillable = ['title', 'description', 'priority', 'startDate', 'endDate', 'startTime', 'endTime', 'task_type_id', 'progress', 'user_id'];

    // public function getPriorityAttribute($value)
    // {
    //     switch ($value) {
    //         case 'high':
    //             return 'Tinggi';
    //         case 'medium':
    //             return 'Sedang';
    //         case 'low':
    //             return 'Rendah';
    //         default:
    //             return $value;
    //     }
    // }
    public function tags()
    {
        return $this->hasMany(Tag::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    public function taskType()
    {
        return $this->belongsTo(TaskType::class, 'task_type_id');
    }

    public function priority()
    {
        return $this->belongsTo(Priority::class);
    }
}
