/* eslint-disable react/prop-types */
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();
  return currentUser ? (
    <Routes>
      <Route {...rest} render={(props) => <Component {...props} />} />
    </Routes>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
