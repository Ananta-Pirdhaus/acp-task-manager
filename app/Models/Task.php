<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
class Task extends Model
{
    protected $fillable = ['title', 'description', 'status', 'priority', 'assigned_to', 'created_by', 'deadline'];

    public function assignedTo()
    {
        return $this->belongsTo(User::class, 'assigned_to', 'user_id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by', 'user_id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
?>