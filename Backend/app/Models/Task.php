<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Employee;
use App\Models\Milestone;
use App\Models\Project;

class Task extends Model
{
    use HasFactory;

    public function project(){

        $this->hasOneThrough(Project::class,Milestone::class,'milestone_id','project_id','id','id');
    }

public function milestone(){

    $this->belongsTo(Milestone::class);
}

public function employee(){

    $this->belongsTo(Employee::class);
}
}
