<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registrasi</title>
</head>

<body>
    <h1>Registrasi</h1>
    <form action="{{ route('register') }}" method="POST">
        @csrf
        <div>
            <label for="name">Nama:</label>
            <input type="text" id="name" name="name" required>
        </div>
        <div>
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
        </div>
        <div>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
        </div>
        <div>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
        </div>
        <div>
            <label for="password_konfirm">Konfirmasi Password:</label>
            <input type="password" id="password_konfirm" name="password_confirmation" required>
        </div>
        <div>
            <label for="role_id">Role:</label>
            <select id="role_id" name="role_id" required>
                <option value="">Pilih Role</option>
                <option value="1">Administrator</option>
                <option value="2">Project Leader</option>
                <option value="3">Programming</option>
            </select>
        </div>
        <button type="submit">Daftar</button>
    </form>
    <p>Sudah punya akun? <a href="{{ route('login') }}">Login di sini</a></p>
</body>

</html>
