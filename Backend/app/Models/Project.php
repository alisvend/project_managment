<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Milestone;
use App\Models\User;

class Project extends Model
{
    use HasFactory;

    public function milestone(){

       return $this->hasMany(Milestone::class);
    }

    public function user(){

       return $this->belongsTo(User::class);
    }
}
