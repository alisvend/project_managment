<?php

namespace App\Http\Controllers;

use App\Models\Milestone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Project;
use App\Models\Task;

class ManagerController extends Controller
{
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
        $user = Auth::id();
        $tasks = Task::where('milestone_id', $request->milestoneID)->with('employee')->latest()->simplePaginate(6);
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
        $task->name = $request->get('taskName');
        $task->percentage = $request->get('percentage');
        $task->save();
    }

    public function displayEmployees()
    {

        $employees = User::where('user_id', Auth::id());
        return $employees;
    }

    public function deleteProject(Request $request)
    {   
        if ($request->user()->is_admin()) {
            $project = Project::where('project_id', $request->get('projectID'));
            $project->delete;
        } else {
            return $data['message'] = 'You have no sufficient permissions';
        }
    }

    public function deleteTask(Request $request)
    {   
        if ($request->user()->is_admin()) {
            $task = Task::where('task_id', $request->get('task_id'));
            $task->delete;
        } else {
            return $data['message'] = 'You have no sufficient permissions';
        }
    }
    public function deleteMilestone(Request $request)
    {   
        if ($request->user()->is_admin()) {
            $milestone = Milestone::where('milestone_id', $request->get('milestone_id'));
            $milestone->delete;
        } else {
            return $data['message'] = 'You have no sufficient permissions';
        }
    }


}
