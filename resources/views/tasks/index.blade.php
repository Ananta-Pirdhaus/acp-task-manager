<h1>Daftar Task</h1>

<a href="{{ route('tasks.create') }}">Tambah Task Baru</a>

<table class="table">
    <thead>
        <tr>
            <th>Judul</th>
            <th>Prioritas</th>
            <th>Status</th>
            <th>Aksi</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($tasks as $task)
            <tr>
                <td>{{ $task->title }}</td>
                <td>{{ $task->priority }}</td>
                <td>  
                    <td>{{ $task->progress }}%</td>
                </td>
                <td>
                    <a href="{{ route('tasks.show', $task->id) }}">Detail</a>
                    <a href="{{ route('tasks.edit', $task->id) }}">Edit</a>
                    <form action="{{ route('tasks.destroy', $task->id) }}" method="POST" style="display: inline-block;">
                        @csrf
                        @method('DELETE')
                        <button type="submit" onclick="return confirm('Anda yakin ingin menghapus task ini?')">Hapus</button>
                    </form>
                </td>
            </tr>
        @endforeach
    </tbody>
</table>