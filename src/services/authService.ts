// authService.ts
import { axiosInstance } from "../lib/axios";

export const loginHandler = async (data: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post("/auth/login", data); // Axios handles JSON by default

    // Extract token and user data from the response
    const { token, user } = response.data;

    // Extract role details from user
    const { email, role } = user;
    const { role_id, role_name } = role;

    // Save user data in localStorage, including role and role_id
    const userData = {
      email,
      role_id, // Store the user's role_id
      role_name, // Store the user's role_name
    };

    // Store the user data and token in localStorage
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);

    return {
      status: "success",
      message: "Login successful",
      token,
      role_id,
      role_name,
    };
  } catch (error: any) {
    // Error handling for Axios errors
    const errorMessage = error.response?.data?.message || "Login failed";
    return { status: "error", message: errorMessage };
  }
};

export const registerHandler = async (data: {
  name: string;
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
  role_id: number;
}) => {
  try {
    const response = await axiosInstance.post("/auth/register", data); // Axios handles JSON by default

    return {
      status: "success",
      message: "Registration successful",
      data: response.data,
    };
  } catch (error: any) {
    // Error handling for Axios errors
    const errorMessage = error.response?.data?.message || "Registration failed";
    return { status: "error", message: errorMessage };
  }
};
