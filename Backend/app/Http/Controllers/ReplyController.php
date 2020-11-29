<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reply;
use Illuminate\Support\Facades\Auth;
use App\Models\Issue;

class ReplyController extends Controller
{
  public function getReplies(Request $request){

    $rep=Reply::where('issue_id',$request->get('id'))->with('user')->get();
    return $rep;
  }

  public function addReply(Request $request){

    $reply = new Reply();
    $reply->user_id = Auth::id();
    $reply->issue_id = $request->get('issueID');
    $reply->reply = $request->get('reply');
    $reply->save();
  }


  public function deleteIssue(Request $request)
  {   
     
          $issue = Issue::where('id', $request->get('issue_id'))->where('user_id',Auth::id());
          $issue->delete();
      
  }

  public function deleteReply(Request $request)
  {   
      
          $reply = Reply::where('id', $request->get('reply_id'))->where('user_id',Auth::id());
          $reply->delete();
      
  }
}
