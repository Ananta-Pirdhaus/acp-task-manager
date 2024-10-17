// authService.ts
export const loginHandler = async (data: {
  username: string;
  password: string;
}) => {
  // Example API call for login
  return await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((response) => response.json());
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
