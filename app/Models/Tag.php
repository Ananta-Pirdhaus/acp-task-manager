<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory, HasUuids;
    use HasFactory;

    protected $primaryKey = 'id'; 
    public $incrementing = false; 
    protected $keyType = 'string'; 
    public $timestamps = false;

    protected $fillable = [
        'task_id',
        'title',
        'color'
    ];

    // Relasi dengan model Task
    public function task()
    {
        return $this->belongsTo(Task::class, 'task_id');
    }
}
