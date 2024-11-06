import { useRoutes } from "react-router-dom";
import routes from "./routes";

function App() {
  const isAuthenticated = true; // Set your authentication status here
  const routing = useRoutes(routes(isAuthenticated));

  return <>{routing}</>;
}

export default App;
