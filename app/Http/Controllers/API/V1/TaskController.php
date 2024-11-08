<?php

namespace App\Http\Controllers\API\V1;

use Illuminate\Support\Facades\Log;
use App\Models\Tag;
use App\Models\Task;
use Ramsey\Uuid\Uuid;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

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
            'tags' => 'nullable|array',
            'tags.*.title' => 'required|string|max:255',
            'tags.*.color' => 'required|string|max:255',
        ]);

        // Proses penyimpanan task
        $uuid = Uuid::uuid4()->toString();
        $task = Task::create(array_merge(
            $request->except('tags', 'image'),
            ['id' => $uuid]
        ));

        // Cek jika file gambar ada dan valid
        if ($request->hasFile('image') && $request->image->isValid()) {
            $imageName = time() . '.' . $request->image->extension();
            $request->image->move(public_path('images'), $imageName);
            $task->image = $imageName;
        }

        // Simpan tags jika ada
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


    public function show(Task $task)
    {

        if (!$task) {
            return response()->json([
                'status' => false,
                'message' => 'Task not found'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'data' => $task
        ]);
    }


    public function update(Request $request, $id)
    {
        try {
            $task = Task::findOrFail($id);

            $request->validate([
                'title' => 'required|string|max:255',
                'priority' => 'required|in:high,medium,low',
                'startDate' => 'required|date',
                'endDate' => 'required|date',
                'startTime' => 'required|date_format:H:i',
                'progress' => 'required|integer|min:0|max:100',
                'tags.*.title' => 'required|string|max:255',
                'tags.*.color' => 'required|string|max:255',
            ]);

            $task->update($request->except('tags', 'image'));

            if ($request->hasFile('image')) {
                $imageName = time() . '.' . $request->image->extension();
                $request->image->move(public_path('images'), $imageName);
                $task->image = $imageName;
                $task->save();
            }

            if ($request->has('tags')) {
                $task->tags()->delete();
                foreach ($request->tags as $tagData) {
                    $task->tags()->create($tagData);
                }
            }

            $task->load('tags');

            return response()->json([
                'status' => true,
                'message' => 'Task berhasil diperbarui!',
                'data' => $task
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Error: ' . $e->getMessage()
            ], 500);
        }
    }



    public function destroy($id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json([
                'status' => false,
                'message' => 'Task not found'
            ], 404);
        }

        $task->delete();
        return response()->json([
            'status' => true,
            'message' => 'Task berhasil dihapus!'
        ], 200);
    }

}
