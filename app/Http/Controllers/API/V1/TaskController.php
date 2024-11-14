<?php

namespace App\Http\Controllers\API\V1;

use App\Models\Tag;
use App\Models\Task;
use Ramsey\Uuid\Uuid;
use App\Models\Priority;
use App\Models\TaskType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['index', 'show']);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'task_type' => 'required|string|in:Todo,Doing,Done',
                'priority' => 'required|string|in:high,medium,low',
                'startDate' => 'required|date',
                'endDate' => 'required|date',
                'startTime' => 'required|date_format:H:i',
                'endTime' => 'nullable|date_format:H:i',
                'progress' => 'required|integer|min:0|max:100',
                'tags' => 'nullable|array',
                'tags.*.title' => 'string|max:255',
                'tags.*.color' => 'string|max:7',
            ]);

            $taskTypeId = TaskType::where('type', $request->task_type)->first()->id ?? null;

            if (!$taskTypeId) {
                Log::warning('Task type ID tidak ditemukan untuk task type:', ['task_type' => $request->task_type]);
                return response()->json([
                    'status' => false,
                    'message' => 'Invalid task type.',
                ], 400);
            }

            $user = Auth::user();
            if (!$user) {
                return response()->json([
                    'status' => false,
                    'message' => 'User not authenticated.'
                ], 401);
            }

            $task = Task::create([
                'title' => $request->title,
                'description' => $request->description,
                'priority' => $request->priority,
                'startDate' => $request->startDate,
                'endDate' => $request->endDate,
                'startTime' => $request->startTime,
                'endTime' => $request->endTime,
                'progress' => $request->progress,
                'task_type_id' => $taskTypeId,
                'user_id' => $user->user_id,
            ]);

            if ($request->hasFile('image') && $request->image->isValid()) {
                $imageName = time() . '.' . $request->image->extension();
                $request->image->move(public_path('images'), $imageName);
                $task->image = $imageName;
            }

            if ($request->has('tags')) {
                foreach ($request->tags as $tagData) {
                    if (!empty($tagData['title']) && !empty($tagData['color'])) {
                        $tag = new Tag();
                        $tag->title = $tagData['title'];
                        $tag->color = $tagData['color'];
                        $tag->task_id = $task->id;
                        $tag->save();
                    }
                }
            }

            return response()->json([
                'status' => true,
                'data' => $task->load('tags', 'taskType'),
                'message' => 'Task created successfully.',
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error creating task:', [
                'error' => $e->getMessage(),
                'stack' => $e->getTraceAsString()
            ]);
            return response()->json([
                'status' => false,
                'message' => 'Internal Server Error',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function show()
    {
        try {
            $user = Auth::user();
            $tasks = Task::with(['taskType', 'tags'])
            ->where('user_id', $user->user_id)
                ->get();

            if ($tasks->isEmpty()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Tidak ada task ditemukan untuk user ini.'
                ], 404);
            }

            return response()->json([
                'status' => true,
                'data' => $tasks,
                'message' => 'Tasks berhasil diambil.'
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error retrieving tasks: ' . $e->getMessage(), [
                'stack' => $e->getTraceAsString()
            ]);
            return response()->json([
                'status' => false,
                'message' => 'Internal Server Error',
            ], 500);
        }
    }

    public function update(Request $request, $uuid)
    {
        try {
            $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'task_type' => 'required|string|in:Todo,Doing,Done',
                'priority' => 'required|string|in:high,medium,low',
                'startDate' => 'required|date',
                'endDate' => 'required|date',
                'startTime' => 'required|date_format:H:i',
                'endTime' => 'nullable|date_format:H:i',
                'progress' => 'required|integer|min:0|max:100',
                'tags' => 'nullable|array',
                'tags.*.title' => 'string|max:255',
                'tags.*.color' => 'string|max:7',
                'image' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
            ]);

            $task = Task::where('id', $uuid)->first();

            if (!$task) {
                return response()->json([
                    'status' => false,
                    'message' => 'Task not found.',
                ], 404);
            }

            $imageName = $task->image;
            if ($request->hasFile('image') && $request->image->isValid()) {
                if ($task->image && file_exists(public_path('images/' . $task->image))) {
                    unlink(public_path('images/' . $task->image));
                }

                $imageName = time() . '.' . $request->image->extension();
                $request->image->move(public_path('images'), $imageName);
            }

            $task->update([
                'title' => $request->title,
                'description' => $request->description,
                'task_type' => $request->task_type,
                'priority' => $request->priority,
                'startDate' => $request->startDate,
                'endDate' => $request->endDate,
                'startTime' => $request->startTime,
                'endTime' => $request->endTime,
                'progress' => $request->progress,
                'image' => $imageName,
                'alt' => $request->alt ?? $task->alt,
            ]);

            $task->tags()->delete();
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
                'data' => $task->load('tags', 'taskType'),
                'message' => 'Task created successfully.',
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error creating task:', [
                'error' => $e->getMessage(),
                'stack' => $e->getTraceAsString()
            ]);
            return response()->json([
                'status' => false,
                'message' => 'Internal Server Error',
                'error' => $e->getMessage(),
            ], 500);
        }
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
            'message' => 'Task berhasil dihapus.'
        ], 200);
    }
}
