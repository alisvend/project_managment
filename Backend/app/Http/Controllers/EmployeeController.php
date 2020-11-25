<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Project;
use App\Models\Task;

class EmployeeController extends Controller
{
    public function displayTask(){
        $user = Auth::id();
        $tasks=Task::where('user_id',$user)->with('project')->with('milestone');
        return $tasks;

    }

    public function updateTask(Request $request){
        Task::where('id', $request->get('id'))
        ->where('user_id', Auth::id())
        ->update(['status' => $request->get('status')]);
    }
}
