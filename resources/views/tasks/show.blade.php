<h1>Detail Task</h1>

<p><strong>Judul:</strong> {{ $task->title }}</p>
<p><strong>Deskripsi:</strong> {{ $task->description }}</p>
<p><strong>Prioritas:</strong> {{ $task->priority }}</p>
<p><strong>Tanggal Mulai:</strong> {{ $task->startDate }}</p>
<p><strong>Tanggal Selesai:</strong> {{ $task->endDate }}</p>
<p><strong>Waktu Mulai:</strong> {{ $task->startTime }}</p>
<p><strong>Waktu Selesai:</strong> {{ $task->endTime }}</p>
@if ($task->image)
    <img src="{{ asset('images/' . $task->image) }}" alt="{{ $task->alt }}" width="200"> 
@endif
<p><strong>Progress:</strong>{{ $task->progress }}%</p>

<h2>Tags</h2>
<ul>
    @foreach ($task->tags as $tag)
        <li style="color: {{ $tag->color }}">{{ $tag->title }}</li>
    @endforeach
</ul>

<a href="{{ route('tasks.index') }}" >Kembali</a>
<a href="{{ route('tasks.edit', $task->id) }}">Edit</a>