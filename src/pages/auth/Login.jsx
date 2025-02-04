import { Button, Form, Input, notification } from "antd";
import { Link } from "react-router-dom";

const Login = () => {
  const [api, contextHolder] = notification.useNotification();

  const onFinish = (values) => {
    const parse = btoa(`LOGIN ${values.email}`);

    api.success({
      message: `Success`,
      description: (
        <div className="flex flex-col">
          <p>Please Click Verify Login to Authenticated </p>
          <Link
            to={`/auth/redirect?token=${parse}`}
            className="font-semibold text-md underline w-fit"
          >
            Verify Login
          </Link>
        </div>
      ),
      placement: "top",
    });
  };

  return (
    <div className="flex justify-center items-center self-center h-screen">
      {contextHolder}
      <div className="flex flex-col p-3 border border-gray-400 rounded-md w-[500px]">
        <h1 className="text-center text-xl font-semibold">Login</h1>
        <p className="text-center text-sm text-gray-500 mt-4">
          Please input your email to get magic link authentication
        </p>

        <Form
          className="mt-4"
          name="basic"
          initialValues={{
            email: "",
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email with format email.",
                type: "email",
              },
            ]}
          >
            <Input placeholder="Input your email address" />
          </Form.Item>

          <Form.Item label={null}>
            <Button
              type="primary"
              className="bg-blue-600 w-full"
              htmlType="submit"
            >
              Send
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
