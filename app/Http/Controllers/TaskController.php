<?php
<<<<<<< HEAD
// app/Http/Controllers/TaskController.php
=======

>>>>>>> 20da999 (second commit)
namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::all();
        return view('tasks.index', compact('tasks'));
    }

    public function create()
    {
        $users = User::all();
        return view('tasks.create', compact('users'));
    }


<<<<<<< HEAD
=======

>>>>>>> 20da999 (second commit)
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:pending,in_progress,completed',
            'priority' => 'required|in:low,medium,high',
<<<<<<< HEAD
            'assigned_to' => 'nullable|integer',
=======
            'assigned_to' => 'nullable|integer|exists:users,user_id',
>>>>>>> 20da999 (second commit)
            'deadline' => 'nullable|date',
        ]);

        $task = new Task();
        $task->title = $request->title;
        $task->description = $request->description;
        $task->status = $request->status;
        $task->priority = $request->priority;
        $task->assigned_to = $request->assigned_to;
        $task->created_by = auth()->id();
        $task->deadline = $request->deadline;
        $task->save();

        return redirect()->route('tasks.index');
    }

    public function edit($id)
    {
        $task = Task::findOrFail($id);
<<<<<<< HEAD
        return view('tasks.edit', compact('task'));
=======
        $users = User::all();
        return view('tasks.edit', compact('task', 'users'));
>>>>>>> 20da999 (second commit)
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:pending,in_progress,completed',
            'priority' => 'required|in:low,medium,high',
<<<<<<< HEAD
            'assigned_to' => 'nullable|integer',
=======
            'assigned_to' => 'nullable|integer|exists:users,user_id',
>>>>>>> 20da999 (second commit)
            'deadline' => 'nullable|date',
        ]);

        $task = Task::findOrFail($id);
        $task->title = $request->title;
        $task->description = $request->description;
        $task->status = $request->status;
        $task->priority = $request->priority;
        $task->assigned_to = $request->assigned_to;
        $task->deadline = $request->deadline;
        $task->save();

        return redirect()->route('tasks.index');
    }

    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();
        return redirect()->route('tasks.index');
    }
}
