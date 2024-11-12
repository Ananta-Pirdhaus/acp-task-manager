import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginHandler } from "../../services/authService";
import LoginImages from "../../assets/login_images.svg";

const Login: React.FC = () => {
  const [email, setEmail] = useState(""); // Updated to 'email'
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const response = await loginHandler({ email, password }); // Pass email and password
      if (response.status === "success") {
        setSuccessMessage(response.message);
        console.log("Login successful", response);
        navigate("/main");
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred");
      console.error("Login failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Login</h1>
            <div className="w-full flex-1 mt-8">
              <form onSubmit={handleLogin} className="mx-auto max-w-xs">
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Email" // Updated placeholder to "Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Updated to setEmail
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errorMessage && (
                  <p className="text-red-500 mt-3 text-sm">{errorMessage}</p>
                )}
                {successMessage && (
                  <p className="text-green-500 mt-3 text-sm">
                    {successMessage}
                  </p>
                )}
                <button className="mt-5 tracking-wide font-semibold bg-orange-500 text-gray-100 w-full py-4 rounded-lg hover:bg-orange-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                  </svg>
                  <span className="ml-3">Login</span>
                </button>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <a
                    className="inline-block text-sm text-orange-500 dark:text-orange-500 align-baseline hover:text-orange-800"
                    href="#"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="text-center">
                  <a
                    className="inline-block text-sm text-orange-500 dark:text-orange-500 align-baseline hover:text-orange-800"
                    href="/register"
                  >
                    Don't have an account? Register!
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-orange-200 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${LoginImages})`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
