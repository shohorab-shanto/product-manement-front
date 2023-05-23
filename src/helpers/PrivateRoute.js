import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
    const auth = JSON.parse(localStorage.getItem("user"));
    return auth?.access_token ? children : <Navigate to="/" />;
  };