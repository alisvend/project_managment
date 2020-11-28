<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Project;
use App\Models\Milestone;
use App\Models\Task;

class EmployeeController extends Controller
{
    public function displayTask()
    {
        $user = Auth::id();
        $tasks = Task::where('user_id', $user)->with('project')->with('milestone');
        return $tasks;
    }

    public function getEmployeeProjects()
    {
        $user = Auth::id();
        $tasks = Task::where('user_id', $user)->get();
        $tasksArr = json_decode($tasks, true);
        $arr = [];
        foreach ($tasksArr as $item) {
            if (!in_array($item['milestone_id'], $arr)) {
                array_push($arr, $item['milestone_id']);
            }
        }
        $projectIds = Milestone::where("id", $arr)->get();
        $arr2 = [];
        foreach ($projectIds as $item) {
            if (!in_array($item['project_id'], $arr2)) {
                array_push($arr2, $item['project_id']);
            }
        }
        $projects = Project::where("id", $arr2)->get();
        return $projects;
    }

    public function getEmployeeMilestones()
    {
        $user = Auth::id();
        $tasks = Task::where('user_id', $user)->get();
        $tasksArr = json_decode($tasks, true);
        $arr = [];
        foreach ($tasksArr as $item) {
            if (!in_array($item['milestone_id'], $arr)) {
                array_push($arr, $item['milestone_id']);
            }
        }
        $Milestone = Milestone::where("id", $arr)->get();
        return $Milestone;
    }

    public function getEmployeeTasks(Request $request)
    {
        $user = Auth::id();
        $tasks = Task::where('user_id', $user)->where("milestone_id", $request->get("milestoneID"))->get();

        return $tasks;
    }

    public function setStatus(Request $request)
    {

        Task::where('id', $request->get('id'))
            ->where('user_id', Auth::id())
            ->update(['status' => $request->get('status')]);

        $tasks = Task::where('milestone_id', $request->get('milestoneID'))->get();
        $test = true;
        foreach ($tasks as $item) {
            if (!$item['status']) {
                $test = false;
            break;
            } 
        }

        if($test===true){
            Milestone::where('id', $request->get('milestoneID'))
            ->update(['status' => true]);
        }else{
            Milestone::where('id', $request->get('milestoneID'))
            ->update(['status' => false]);

        }

        $milestones = Milestone::where('project_id', $request->get('projectID'))->get();
        $test = true;
        foreach ($milestones as $item) {
            if (!$item['status']) {
                $test = false;
            break;
            } 
        }
        if($test===true){
            Project::where('id', $request->get('projectID'))
            ->update(['status' => true]);
        }else{
            Project::where('id', $request->get('projectID'))
            ->update(['status' => false]);

        }
    }
}
