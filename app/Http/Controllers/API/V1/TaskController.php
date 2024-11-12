<?php

namespace App\Http\Controllers\API\V1;

use Illuminate\Support\Facades\Log;
use App\Models\Tag;
use App\Models\Task;
use Ramsey\Uuid\Uuid;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['index', 'show']);
    }

    public function index()
    {
        $tasks = Task::with('tags')->latest()->get();
        Log::info('Fetched Tasks:', $tasks->toArray());
        return response()->json([
            'status' => true,
            'data' => $tasks,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|in:high,medium,low',
            'startDate' => 'required|date',
            'endDate' => 'required|date',
            'startTime' => 'required|date_format:H:i',
            'endTime' => 'nullable|date_format:H:i',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'alt' => 'nullable|string|max:255',
            'progress' => 'required|integer|min:0|max:100',
            'tags' => 'present|array',
            'tags.*.title' => 'required_with:tags|string|max:255',
            'tags.*.color' => 'required_with:tags|string|max:255',
        ]);

        $user = Auth::user();
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User not authenticated.'
            ], 401);
        }

        $uuid = Uuid::uuid4()->toString();

        $task = Task::create([
            'id' => $uuid,
            'title' => $request->title,
            'description' => $request->description,
            'priority' => $request->priority,
            'startDate' => $request->startDate,
            'endDate' => $request->endDate,
            'startTime' => $request->startTime,
            'endTime' => $request->endTime,
            'image' => $imageName ?? null,
            'alt' => $request->alt ?? null,
            'progress' => $request->progress,
            'user_id' => $user->user_id,
        ]);

        if ($request->hasFile('image') && $request->image->isValid()) {
            $imageName = time() . '.' . $request->image->extension();
            $request->image->move(public_path('images'), $imageName);
            $task->image = $imageName;
        }
        if ($request->has('tags')) {
            foreach ($request->tags as $tagData) {
                $tagUuid = Uuid::uuid4()->toString();

                Tag::create([
                    'id' => $tagUuid,
                    'task_id' => $task->id,
                    'title' => $tagData['title'],
                    'color' => $tagData['color'],
                ]);
            }
        }

        return response()->json([
            'status' => true,
            'data' => $task,
            'message' => 'Task berhasil ditambahkan!'
        ], 201);
    }


    public function show($id)
    {
        $user = Auth::user();

        $task = Task::find($id);
        if (!$task || $task->user_id !== $user->user_id) {
            return response()->json([
                'status' => false,
                'message' => 'Task not found or you do not have access to this task.'
            ], 404);
        }


        return response()->json([
            'status' => true,
            'data' => $task
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|in:high,medium,low',
            'startDate' => 'required|date',
            'endDate' => 'required|date',
            'startTime' => 'required|date_format:H:i',
            'endTime' => 'nullable|date_format:H:i',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'alt' => 'nullable|string|max:255',
            'progress' => 'required|integer|min:0|max:100',
            'tags' => 'present|array',
            'tags.*.title' => 'required_with:tags|string|max:255',
            'tags.*.color' => 'required_with:tags|string|max:255',
        ]);

        $task = Task::find($id);

        if (!$task) {
            return response()->json([
                'status' => false,
                'message' => 'Task tidak ditemukan.'
            ], 404);
        }

        $task->update($request->except('tags', 'image'));

        if ($request->hasFile('image') && $request->image->isValid()) {
            $imageName = time() . '.' . $request->image->extension();
            $request->image->move(public_path('images'), $imageName);
            $task->image = $imageName;
            $task->save();
        }

        if ($request->has('tags')) {
            $task->tags()->delete();
            foreach ($request->tags as $tagData) {
                $tagUuid = Uuid::uuid4()->toString();
                Tag::create([
                    'id' => $tagUuid,
                    'task_id' => $task->id,
                    'title' => $tagData['title'],
                    'color' => $tagData['color'],
                ]);
            }
        }

        return response()->json([
            'status' => true,
            'data' => $task,
            'message' => 'Task berhasil diperbarui!'
        ], 200);
    }

    public function destroy($id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json([
                'status' => false,
                'message' => 'Task tidak ditemukan.'
            ], 404);
        }

        $task->tags()->delete();
        $task->delete();

        return response()->json([
            'status' => true,
            'message' => 'Task berhasil dihapus!'
        ], 200);
    }

    public function getUserTasks()
    {
        $user = Auth::user();
        $tasks = $user->tasks;

        return response()->json([
            'status' => true,
            'data' => $tasks
        ]);
    }
}
