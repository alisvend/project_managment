<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Issue;

class Reply extends Model
{
    use HasFactory;

    public function issue(){

        $this->belongsTo(Issue::class);
    }

    public function user(){

        $this->belongsTo(User::class);
    }
}
