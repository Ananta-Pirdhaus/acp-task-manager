<h1>Edit Task</h1>

<form action="{{ route('tasks.update', $task->id) }}" method="POST" enctype="multipart/form-data">
    @csrf
    @method('PUT')
    <div>
        <label for="title">Judul</label>
        <input type="text" name="title" id="title" value="{{ $task->title }}" required>
    </div>
    <div>
        <label for="description">Deskripsi</label>
        <textarea name="description" id="description"> {{ $task->description }}</textarea>
    </div>
    <div>
        <label for="priority">Prioritas</label>
        <select name="priority" id="priority" required>
            <option value="high" {{ $task->priority === 'Tinggi' ? 'selected' : '' }}>Tinggi</option>
            <option value="medium" {{ $task->priority === 'Sedang' ? 'selected' : '' }}>Sedang</option>
            <option value="low" {{ $task->priority === 'Rendah' ? 'selected' : '' }}>Rendah</option>
        </select>
    </div>
    <div>
        <label for="startDate">Tanggal Mulai</label>
        <input type="date" name="startDate" id="startDate" value="{{ $task->startDate }}" required>
    </div>
    <div>
        <label for="endDate">Tanggal Selesai</label>
        <input type="date" name="endDate" id="endDate" value="{{ $task->endDate }}" required>
    </div>
    <div>
        <label for="startTime">Waktu Mulai</label>
        <input type="time" name="startTime" id="startTime" value="{{ $task->startTime }}" required>
    </div>
    <div>
        <label for="endTime">Waktu Selesai</label>
        <input type="time" name="endTime" id="endTime" value="{{ $task->endTime }}">
    </div>
    @if ($task->image)
        <div>
            <img src="{{ asset('images/' . $task->image) }}" alt="{{ $task->alt }}" width="200">
        </div>
    @endif
    <div>
        <label for="image">Gambar</label>
        <input type="file" name="image" id="image">
    </div>
    <div>
        <label for="alt">Teks Alternatif Gambar</label>
        <input type="text" name="alt" id="alt" value="{{ $task->alt }}">
    </div>

    <div>
        <label for="progress">Progress:</label>
        <input type="number" name="progress" id="progress" value="{{ old('progress', $task->progress) }}"
            min="0" max="100"> %
    </div>

    <h2>Tags</h2>
    <div id="tags-container">
        @foreach ($task->tags as $index => $tag)
            <div>
                <div>
                    <label for="tag-title">Judul Tag</label>
                    <input type="text" name="tags[{{ $index }}][title]" value="{{ $tag->title }}"
                        required>
                </div>
                <div>
                    <label for="tag-color">Warna Tag</label>
                    <input type="color" name="tags[{{ $index }}][color]" value="{{ $tag->color }}"
                        required>
                </div>
                <button type="button">Hapus Tag</button>
            </div>
        @endforeach
    </div>
    <button type="button" onclick="addTagInput()">Tambah Tag</button>

    <button type="submit">Simpan Perubahan</button>
</form>

<script>
    let tagCount = {{ count($task->tags) }};

    function addTagInput() {}

    const removeTagButtons = document.querySelectorAll('.remove-tag');
    removeTagButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.parentNode.remove();
        });
    });
</script>
