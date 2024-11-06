// users.ts

interface User {
  username: string;
  password: string;
  role: string;
}

// Dummy user data
const users: User[] = [
  {
    username: "john_doe",
    password: "password123",
    role: "admin",
  },
  {
    username: "test1",
    password: "user12345678",
    role: "admin",
  },
  {
    username: "jane_smith",
    password: "password456",
    role: "user",
  },
  {
    username: "michael_brown",
    password: "password789",
    role: "moderator",
  },
];

export default users;
