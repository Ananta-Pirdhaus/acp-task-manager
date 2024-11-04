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

    protected $fillable = [
        'title',
        'description',
        'priority',
        'startDate',
        'endDate',
        'startTime',
        'endTime',
        'image',
        'alt',
        'progress'
    ];

    public function getPriorityAttribute($value)
    {
        switch ($value) {
            case 'high':
                return 'Tinggi';
            case 'medium':
                return 'Sedang';
            case 'low':
                return 'Rendah';
            default:
                return $value;
        }
    }

    public function tags()
    {
        return $this->hasMany(Tag::class);
    }
}
