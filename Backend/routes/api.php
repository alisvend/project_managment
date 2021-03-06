<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ManagerController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\IssueController;
use App\Http\Controllers\ReplyController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::middleware('auth:sanctum')->get('/projects', [ManagerController::class,'displayProject']);
Route::middleware('auth:sanctum')->post('/milestones', [ManagerController::class,'displayMilestone']);
Route::middleware('auth:sanctum')->post('/tasks', [ManagerController::class,'displayTask']);
Route::middleware('auth:sanctum')->post('/deleteTask', [ManagerController::class,'deleteTask']);
Route::middleware('auth:sanctum')->post('/regEmp', [ManagerController::class,'userSignUp']);
Route::middleware('auth:sanctum')->post('/addProject', [ManagerController::class,'storeProject']);
Route::middleware('auth:sanctum')->post('/addMile', [ManagerController::class,'storeMilestone']);
Route::middleware('auth:sanctum')->post('/addTask', [ManagerController::class,'storeTask']);
Route::middleware('auth:sanctum')->get('/getEmployees', [ManagerController::class,'getEmployeesByManager']);
Route::middleware('auth:sanctum')->post('/deleteMilestone', [ManagerController::class,'deleteMilestone']);
Route::middleware('auth:sanctum')->post('/deleteProject', [ManagerController::class,'deleteProject']);
Route::middleware('auth:sanctum')->get('/employeeProjects', [EmployeeController::class,'getEmployeeProjects']);
Route::middleware('auth:sanctum')->post('/employeeMilestones', [EmployeeController::class,'getEmployeeMilestones']);
Route::middleware('auth:sanctum')->post('/employeeTasks', [EmployeeController::class,'getEmployeeTasks']);
Route::middleware('auth:sanctum')->post('/setStatus', [EmployeeController::class,'setStatus']);
Route::middleware('auth:sanctum')->post('/addIssue', [IssueController::class,'addIssue']);
Route::middleware('auth:sanctum')->get('/issues', [IssueController::class,'displayIssues']);
Route::middleware('auth:sanctum')->post('/getReplies', [ReplyController::class,'getReplies']);
Route::middleware('auth:sanctum')->post('/getIssueByID', [IssueController::class,'getIssueByID']);
Route::middleware('auth:sanctum')->post('/addReply', [ReplyController::class,'addReply']);
Route::middleware('auth:sanctum')->post('/deleteIssue', [ReplyController::class,'deleteIssue']);
Route::middleware('auth:sanctum')->post('/deleteReply', [ReplyController::class,'deleteReply']);