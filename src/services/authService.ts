import users from "../data/users";

// authService.ts
export const loginHandler = async (data: {
  username: string;
  password: string;
}) => {
  const user = users.find(
    (user) => user.username === data.username && user.password === data.password
  );

  // Dummy response for testing
  if (user) {
    const response = {
      status: "success",
      message: "Login successful",
      token: "dummy_jwt_token_123",
      role: user.role, // Return user's role
    };

    // Buat objek pengguna dan simpan ke localStorage
    const userData = {
      username: user.username,
      role: response.role,
    };

    localStorage.setItem("user", JSON.stringify(userData)); // Simpan objek pengguna

    return Promise.resolve(response);
  } else {
    return Promise.resolve({
      status: "error",
      message: "Invalid username or password",
    });
  }
};

export const registerHandler = async (data: {
  name: string;
  username: string;
  password: string;
  position: string;
}) => {
  // Example API call for registration
  return await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((response) => response.json());
};
