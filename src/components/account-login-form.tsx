import { Button, Form, Input } from "antd";

import { AccountLoginRequest } from "@/lib/models";

const AccountLoginForm = ({
  onFinish,
}: {
  onFinish: (request: AccountLoginRequest) => void;
}) => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="horizontal"
      requiredMark="optional"
      size="large"
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "请输入选课社区用户名",
          },
        ]}
      >
        <Input placeholder="选课社区用户名" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入选课社区密码" }]}
      >
        <Input.Password placeholder="选课社区密码" size="large" />
      </Form.Item>

      <Form.Item extra="非特殊情况下，请使用邮箱验证码或者密码登录">
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "100%" }}
          size="large"
        >
          使用账号登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AccountLoginForm;
