<?php
namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'task_id' => 'required|integer|exists:tasks,id',
            'comment' => 'required|string',
        ]);

        $comment = new Comment();
        $comment->task_id = $request->task_id;
        $comment->user_id = auth()->id();
        $comment->comment = $request->comment;
        $comment->save();

        return redirect()->back();
    }
}
?>