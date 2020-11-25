<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Issue;
use App\Models\Reply;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    public function can_issue()
    {
        $role = $this->role;
        if ($role == 'employee' || $role == 'admin') {
            return true;
        }
        return false;
    }

    public function is_admin()
    {
        $role = $this->role;
        if ($role == 'admin') {
            return true;
        }
        return false;
    }


    public function issue()
    {

        $this->hasMany(Issue::class);
    }

    public function reply()
    {

        $this->hasManyThrough(reply::class, issue::class);
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'user_id',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
