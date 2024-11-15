<?php

namespace App\Http\Controllers\API\V1;

use App\Models\Tag;
use App\Models\Task;
use App\Models\User;
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

    public function store(Request $request, $user_id)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'task_type_id' => 'required|exists:task_types,id',
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

            Log::info("Method store dipanggil dengan user_id: $user_id");
            $user = User::findOrFail($user_id);
            $task = new Task([
                'title' => $request->title,
                'description' => $request->description,
                'priority' => $request->priority,
                'startDate' => $request->startDate,
                'endDate' => $request->endDate,
                'startTime' => $request->startTime,
                'endTime' => $request->endTime,
                'progress' => $request->progress,
                'task_type_id' => $request->task_type_id,
            ]);

            $user->tasks()->save($task);

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
                    'status' => true,
                    'data' => [],
                    'message' => 'Tidak ada task ditemukan untuk user ini.'
                ], 200);
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

    public function update(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'task_type_id' => 'required|exists:task_types,id',
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

            $task = Task::find($id);

            if (!$task) {
                return response()->json([
                    'status' => false,
                    'message' => 'Task not found.',
                ], 404);
            }

            $task->update([
                'title' => $request->title,
                'description' => $request->description,
                'task_type_id' => $request->task_type_id,
                'priority' => $request->priority,
                'startDate' => $request->startDate,
                'endDate' => $request->endDate,
                'startTime' => $request->startTime,
                'endTime' => $request->endTime,
                'progress' => $request->progress,
            ]);

            if ($request->hasFile('image') && $request->image->isValid()) {
                if ($task->image && file_exists(public_path('images/' . $task->image))) {
                    unlink(public_path('images/' . $task->image));
                }

                $imageName = time() . '.' . $request->image->extension();
                $request->image->move(public_path('images'), $imageName);
                $task->image = $imageName;
            }

            $task->tags()->delete();
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

            $task->load('tags', 'taskType');

            return response()->json([
                'status' => true,
                'data' => $task,
                'message' => 'Task updated successfully.',
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error updating task:', [
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
    
    public function getTasksByUserId(Request $request, $user_id)
    {
        try {   
            $authenticatedUser = $request->user();
            if ($authenticatedUser->user_id != $user_id) {
                return response()->json([
                    'status' => false,
                    'message' => 'Anda tidak memiliki akses untuk melihat task ini.'
                ], 403);
            }

            $tasks = Task::with(['taskType', 'tags', 'priority', 'user'])
                ->where('user_id', $user_id)
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
            return response()->json([
                'status' => false,
                'message' => 'Terjadi kesalahan saat mengambil data tasks.',
            ], 500);
        }
    }

    public function handleUnsupportedMethod()
    {
        return response()->json(['message' => 'Method Not Allowed'], 405);
    }

}
