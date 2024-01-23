import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../appwrite/ApiAppwrite";

const PrivateRoutes = () => {
  const { user } = useAuth();

  return (user && user.roleId === 1) || user.roleId === 0 ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" />
  );
};

export default PrivateRoutes;
