<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Task;

class Employee extends Model
{
    use HasFactory;

    public function task(){

        $this->hasMany(Task::class);
    }
}
