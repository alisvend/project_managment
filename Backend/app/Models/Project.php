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

        $this->hasMany(Milestone::class);
    }

    public function user(){

        $this->belongsTo(User::class);
    }
}
