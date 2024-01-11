import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./appwrite/ApiAppwrite";

const AuthLayout = () => {
  const { user } = useAuth();
  return (
    <>
      {user ? (
        <Navigate to="/" />
      ) : (
        <div
          className="w-screen h-screen  bg-cover bg-no-repeat"
          style={{ backgroundImage: `url('/assets/img/banner/food.webp')` }}>
          <Outlet />
        </div>
      )}
    </>
  );
};

export default AuthLayout;
