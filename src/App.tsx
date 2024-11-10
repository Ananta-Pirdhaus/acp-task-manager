import { useRoutes } from "react-router-dom";
import routes from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  <ToastContainer position="top-right" autoClose={3000} />;
  const isAuthenticated = true; // Set your authentication status here
  const routing = useRoutes(routes(isAuthenticated));

  return <>{routing}</>;
}

export default App;
