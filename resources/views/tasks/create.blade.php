@extends('layouts.app')

@section('content')
    <h1>Create Task</h1>
    <form action="{{ route('tasks.store') }}" method="POST">
        @csrf
        <label for="title">Title:</label>
        <input type="text" id="title" name="title" required>

        <label for="description">Description:</label>
        <textarea id="description" name="description"></textarea>

        <label for="status">Status:</label>
        <select id="status" name="status">
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
        </select>

        <label for="priority">Priority:</label>
        <select id="priority" name="priority">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
        </select>

        <label for="assigned_to">Assigned To:</label>
        <select id="assigned_to" name="assigned_to">
            @foreach ($users as $user)
                <option value="{{ $user->user_id }}">{{ $user->name }}</option>
            @endforeach
        </select>


        <label for="deadline">Deadline:</label>
        <input type="date" id="deadline" name="deadline">

        <button type="submit">Create Task</button>
    </form>
@endsection
