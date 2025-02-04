import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "../../stores/useUserStore";
import MainLayout from "./MainLayout";

const WrapperLogged = () => {
  const { user } = useUserStore();

  if (user) {
    return (
      <MainLayout>
        <Outlet />
      </MainLayout>
    );
  }
  return <Navigate to="/auth/login" />;
};

export default WrapperLogged;
