<?php
// app/Models/User.php
namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;
    protected $primaryKey = "user_id";

    protected $fillable = [
        'name',
        'username',
        'password',
        'path_photo',
        'status',
        'token',
        'fail_login_count',
        'last_login',
    ];

    protected $hidden = [
        'password',
        'token',
        'fail_login_count',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        $roleActive = $this->userRole[0];
        return [
            'users' => [
                'id'         => $this->user_id,
                'username'   => $this->username,
                'name'       => $this->name,
            ],
        ];
    }

    public function userRole(): HasMany
    {
        return $this->hasMany(UserRole::class, 'user_id', 'user_id');
    }

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class, 'assigned_to', 'user_id');
    }

    public function createdTasks(): HasMany
    {
        return $this->hasMany(Task::class, 'created_by', 'user_id');
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class, 'user_id', 'user_id');
    }

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class, 'role_assignments', 'user_id', 'role_id');
    }
}


?>