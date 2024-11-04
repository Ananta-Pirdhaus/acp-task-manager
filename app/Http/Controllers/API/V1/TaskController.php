<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;

use Ramsey\Uuid\Uuid;
use App\Models\Task;
use App\Models\Tag;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::with('tags')->get();
        return view('tasks.index', compact('tasks'));
    }

    public function create()
    {
        return view('tasks.create');
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

        // Gnerate
        $uuid = Uuid::uuid4()->toString();

        $task = Task::create(array_merge(
            $request->except('tags', 'image'),
            ['id' => $uuid]
        ));

        // Handle upload
        if ($request->hasFile('image')) {
            $imageName = time() . '.' . $request->image->extension();
            $request->image->move(public_path('images'), $imageName);
            $task->image = $imageName;
            $task->save();
        }

        // Simpan tag
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

        return redirect()->route('tasks.index')->with('success', 'Task berhasil ditambahkan!');
    }

    public function show(Task $task)
    {
        return view('tasks.show', compact('task'));
    }

    public function edit(Task $task)
    {
        return view('tasks.edit', compact('task'));
    }

    public function update(Request $request, Task $task)
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

        $task->update($request->except('tags', 'image'));

        // Handle jika ada gambar baru
        if ($request->hasFile('image')) {
            $imageName = time() . '.' . $request->image->extension();
            $request->image->move(public_path('images'), $imageName);
            $task->image = $imageName;
            $task->save();
        }


        return redirect()->route('tasks.index')->with('success', 'Task berhasil diperbarui!');
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return redirect()->route('tasks.index')->with('success', 'Task berhasil dihapus!');
    }
}
