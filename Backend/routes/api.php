<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ManagerController;

use App\Http\Controllers\Auth\RegisterController;
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