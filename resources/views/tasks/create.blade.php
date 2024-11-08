<h1>Tambah Task Baru</h1>

<form action="{{ route('tasks.store') }}" method="POST" enctype="multipart/form-data">
    @csrf
    <div>
        <label for="title">Judul</label>
        <input type="text" name="title" id="title" required>
    </div>
    <div>
        <label for="description">Deskripsi</label>
        <textarea name="description" id="description"></textarea>
    </div>
    <div>
        <label for="priority">Prioritas</label>
        <select name="priority" id="priority" required>
            <option value="high">Tinggi</option>
            <option value="medium">Sedang</option>
            <option value="low">Rendah</option>
        </select>
    </div>
    <div>
        <label for="startDate">Tanggal Mulai</label>
        <input type="date" name="startDate" id="startDate" required>
    </div>
    <div>
        <label for="endDate">Tanggal Selesai</label>
        <input type="date" name="endDate" id="endDate" required>
    </div>
    <div>
        <label for="startTime">Waktu Mulai</label>
        <input type="time" name="startTime" id="startTime" required>
    </div>
    <div>
        <label for="endTime">Waktu Selesai</label>
        <input type="time" name="endTime" id="endTime">
    </div>
    <div>
        <label for="image">Gambar</label>
        <input type="file" name="image" id="image" class="form-control-file">
    </div>
    <div>
        <label for="alt">Teks Alternatif Gambar</label>
        <input type="text" name="alt" id="alt">
    </div>

    <div>
        <label for="progress">Progress:</label>
        <input type="number" name="progress" id="progress" value="{{ old('progress', 0) }}" min="0"
            max="100"> %
    </div>

    <h2>Tags</h2>
    <div id="tags-container">
        <div class="tag-input">
            <div>
                <label for="tag-title">Judul Tag</label>
                <input type="text" name="tags[0][title]" required>
            </div>
            <div>
                <label for="tag-color">Warna Tag</label>
                <input type="color" name="tags[0][color]" required>
            </div>
        </div>
    </div>
    <button type="button" class="btn btn-secondary" onclick="addTagInput()">Tambah Tag</button>

    <button type="submit" class="btn btn-primary">Simpan</button>
</form>

<script>
    let tagCount = 1;

    function addTagInput() {
        const container = document.getElementById('tags-container');
        const newInput = `
            <div class="tag-input">
                <div>
                    <label for="tag-title">Judul Tag</label>
                    <input type="text" name="tags[${tagCount}][title]" required>
                </div>
                <div>
                    <label for="tag-color">Warna Tag</label>
                    <input type="color" name="tags[${tagCount}][color]" required>
                </div>
            </div>
        `;
        container.innerHTML += newInput;
        tagCount++;
    }
</script>
