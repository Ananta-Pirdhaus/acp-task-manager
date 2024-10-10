@extends('layouts.app')

@section('content')
<<<<<<< HEAD
    <h1>Edit Task</h1>
    <form action="{{ route('tasks.update', $task->id) }}" method="POST">
        @csrf
        @method('PUT')

        <label for="title">Title:</label>
        <input type="text" id="title" name="title" value="{{ $task->title }}" required>

        <label for="description">Description:</label>
        <textarea id="description" name="description">{{ $task->description }}</textarea>

        <label for="status">Status:</label>
        <select id="status" name="status">
            <option value="pending" {{ $task->status == 'pending' ? 'selected' : '' }}>Pending</option>
            <option value="in_progress" {{ $task->status == 'in_progress' ? 'selected' : '' }}>In Progress</option>
            <option value="completed" {{ $task->status == 'completed' ? 'selected' : '' }}>Completed</option>
        </select>

        <label for="priority">Priority:</label>
        <select id="priority" name="priority">
            <option value="low" {{ $task->priority == 'low' ? 'selected' : '' }}>Low</option>
            <option value="medium" {{ $task->priority == 'medium' ? 'selected' : '' }}>Medium</option>
            <option value="high" {{ $task->priority == 'high' ? 'selected' : '' }}>High</option>
        </select>

        <label for="assigned_to">Assigned To:</label>
        <input type="number" id="assigned_to" name="assigned_to" value="{{ $task->assigned_to }}">

        <label for="deadline">Deadline:</label>
        <input type="date" id="deadline" name="deadline" value="{{ $task->deadline }}">

        <button type="submit">Update Task</button>
=======
    <h1>Buat Tugas Baru</h1>
    <form action="{{ route('tasks.store') }}" method="POST">
        @csrf
        <label for="title">Judul:</label>
        <input type="text" id="title" name="title" required>
        
        <label for="description">Deskripsi:</label>
        <textarea id="description" name="description"></textarea>
        
        <label for="status">Status:</label>
        <select id="status" name="status">
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
        </select>
        
        <label for="priority">Prioritas:</label>
        <select id="priority" name="priority">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
        </select>

        <label for="assigned_to">Diberikan Kepada:</label>
        <select id="assigned_to" name="assigned_to">
            @foreach($users as $user)
                <option value="{{ $user->user_id }}">{{ $user->name }}</option>
            @endforeach
        </select>
        
        <label for="deadline">Batas Waktu:</label>
        <input type="date" id="deadline" name="deadline">
        
        <button type="submit">Buat Tugas</button>
>>>>>>> 20da999 (second commit)
    </form>
@endsection
