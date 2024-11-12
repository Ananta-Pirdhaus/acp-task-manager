import React, { useState, useEffect } from "react";
import { registerHandler } from "../../services/authService";
import RegisterImages from "../../assets/register_images.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [roleId, setRoleId] = useState<number | null>(null);
  const [roles, setRoles] = useState<{ role_id: number; role_name: string }[]>(
    []
  );
  const [registrationMessage, setRegistrationMessage] = useState("");
  const [userInfo, setUserInfo] = useState<any>(null);

  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/v1/roles");
        if (response.data.meta.code === 200) {
          setRoles(response.data.data.data);
        }
      } catch (error) {
        console.error("Error fetching roles", error);
      }
    };

    fetchRoles();
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setRegistrationMessage("Passwords do not match");
      return;
    }

    try {
      const response = await registerHandler({
        name,
        username,
        email,
        password,
        password_confirmation: passwordConfirmation,
        role_id: roleId!,
      });

      if (response.status === "success") {
        setRegistrationMessage(response.message);
        setUserInfo(response.data);
        console.log("response register: ", response)
        // Redirect to login page after successful registration
        navigate("/login"); // Use navigate to redirect
      }
    } catch (error) {
      console.error("Registration failed", error);
      setRegistrationMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Sign Up</h1>
            <div className="w-full flex-1 mt-8">
              <form onSubmit={handleRegister} className="mx-auto max-w-xs">
                {/* Form fields */}
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Confirm Password"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
                <select
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  value={roleId ?? ""}
                  onChange={(e) => setRoleId(Number(e.target.value))}
                >
                  <option value="" disabled>
                    Select Position
                  </option>
                  {roles.map((role) => (
                    <option key={role.role_id} value={role.role_id}>
                      {role.role_name}
                    </option>
                  ))}
                </select>
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
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Sign Up</span>
                </button>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <a
                    className="inline-block text-sm text-orange-500 dark:text-orange-500 align-baseline hover:text-orange-800"
                    href="/login"
                  >
                    Already have an account? Login!
                  </a>
                </div>
              </form>

              {registrationMessage && (
                <div className="mt-4 text-center text-lg">
                  {registrationMessage}
                </div>
              )}

              {userInfo && (
                <div className="mt-4 text-center text-lg">
                  <h3 className="font-bold">User Info:</h3>
                  <p>Name: {userInfo.name}</p>
                  <p>Username: {userInfo.username}</p>
                  <p>Email: {userInfo.email}</p>
                  <p>Role: {userInfo.role.role_name}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex-1 bg-orange-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${RegisterImages})`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
