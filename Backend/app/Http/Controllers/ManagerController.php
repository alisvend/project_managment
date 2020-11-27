<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use App\Models\Project;
use App\Models\Milestone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ManagerController extends Controller
{
    protected function create(Request $request)
    {
        return User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'user_id' => $request->manager_id,
            
        ]);}


    public function displayProject()
    {
        $user = Auth::id();
        $projects = Project::where('user_id', $user)->latest()->simplePaginate(6);
        return $projects;
    }

    public function displayMilestone(Request $request)
    {
        $pid=$request->projectID;
        $milestones = Milestone::where('project_id', $pid)->get();
        return $milestones;
    }

    public function displayTask(Request $request)
    {
       
        $tasks = Task::where('milestone_id', $request->milestoneID)->with('employee')->get();
        return $tasks;
    }


    public function storeProject(Request $request)
    {
        $project = new Project();
        $project->user_id = Auth::id();
        $project->projectName = $request->get('projectName');
        $project->deadline = $request->get('deadline');
        $project->save();
    }

    public function storeMilestone(Request $request)
    {
        $milestone = new Milestone();
        $milestone->project_id = $request->get('projectID');
        $milestone->name = $request->get('milestoneName');
        $milestone->deadline = $request->get('deadline');
        $milestone->save();
    }

    public function storeTask(Request $request)
    {
        $task = new Task();
        $task->user_id = Auth::id();
        $task->milestone_id = $request->get('milestoneID');
        $task->taskName = $request->get('taskName');
        $task->percentage = $request->get('percentage');
        $task->save();
    }

    public function getEmployeesByManager()
    {

        $employees = User::where('user_id', Auth::id())->latest()->simplePaginate(1000);
        return $employees;
    }

    public function deleteProject(Request $request)
    {   
        if ($request->user()->is_admin()) {
            $project = Project::where('id', $request->get('project_id'));
            $project->delete();
        } else {
            return $data['message'] = 'You have no sufficient permissions';
        }
    }

    public function deleteTask(Request $request)
    {   
        if ($request->user()->is_admin()) {
            $task = Task::where('id', $request->get('taskId'));
            $task->delete();
        } else {
            return $data['message'] = 'You have no sufficient permissions';
        }
    }
    public function deleteMilestone(Request $request)
    {   
        if ($request->user()->is_admin()) {
            $milestone = Milestone::where('id', $request->get('milestone_id'));
            $milestone->delete();
        } else {
            return $data['message'] = 'You have no sufficient permissions';
        }
    }

public function userSignUp(Request $request){
        $validator = Validator::make($request->all(),[
            "name" => "required",
            "email" => "required|email",
            "password" => "required",
            
        ]);
        if($validator->fails()){
            return response()->json(["status"=>"failed","message"=>"validation_error","errors"=>$validator->errors()]);
        }
        //$name = $request->name;
        $userDataArray = array(
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'user_id' => $request->manager_id,
            
        );
        $user_status = User::where("email",$request->email)->first();
        if(!is_null($user_status)){
            return response()->json(["status"=>"failed","success"=>false,"message" => "Email is already registered"]);
        }
        $user = User::create($userDataArray);
        if(!is_null($user)){
            return response()->json(["status" => $this->status_code,"success"=>true,"message"=>"Registration completed successfully","data" => $user]);
        }
        else{
            return response()->json(["status"=>"failed","success"=>false,"message"=>"failed to register"]);
        }
}
}