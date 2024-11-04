<form action="{{ route('login') }}" method="POST">
    @csrf
    <div>
        <label for="username">Username:</label>
        <input type="text" name="username" id="username" required>
    </div>
    <div>
        <label for="password">Password:</label>
        <input type="password" name="password" id="password" required>
    </div>
    <p>Belum punya akun? <a href="{{ route('register') }}">Daftar di sini</a></p>
    <button type="submit">Login</button>
</form>
