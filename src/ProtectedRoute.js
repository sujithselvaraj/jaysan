import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "./Components/Reducers/AxiosConfig";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    api.get("auth/check", { withCredentials: true }) // Include session cookie
      .then((response) => {
        setIsAuthenticated(response.data.authenticated);
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>; // Show loading while checking

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
