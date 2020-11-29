<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Issue;

class IssueController extends Controller
{
    public function addIssue(Request $request){

        $issue = new Issue();
        $issue->user_id = Auth::id();
        $issue->title = $request->get('title');
        $issue->issue = $request->get('issue');
        $issue->save();
    }

    public function displayIssues(){

        
        $issues = Issue::with('user')->get();
        return $issues;


    }

    public function getIssueByID(Request $request){

        $issue=Issue::where('id',$request->id)->with('user')->get();
        return $issue;
    }
}
