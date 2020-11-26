<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Reply;

class Issue extends Model
{
    use HasFactory;

    public function user(){

       return $this->belongsTo(User::class);

    }

    public function reply(){

        return $this->hasMany(Reply::class);
        
    }
}
