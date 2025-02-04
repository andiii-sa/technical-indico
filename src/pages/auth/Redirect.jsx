import { notification, Spin } from "antd";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useUserStore from "../../stores/useUserStore";

const Redirect = () => {
  const [searchParams] = useSearchParams();
  const [api, contextHolder] = notification.useNotification();
  const { setUser } = useUserStore();

  const getToken = searchParams.get("token");

  useEffect(() => {
    const parse = atob(getToken);
    const getEmail = parse.replace("LOGIN ", "");
    api.success({
      message: "Authentication successful!",
      showProgress: true,
    });

    setTimeout(() => {
      setUser(getEmail);
    }, 1000);
  }, [getToken, api, setUser]);

  return (
    <div className="flex h-screen items-center justify-center">
      {contextHolder}
      <Spin size="large" />
    </div>
  );
};

export default Redirect;
