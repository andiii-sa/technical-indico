import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "../../stores/useUserStore";

const AuthWrapper = () => {
  const { user } = useUserStore();

  if (!user) {
    return <Outlet />;
  }
  return <Navigate to="/" />;
};

export default AuthWrapper;
