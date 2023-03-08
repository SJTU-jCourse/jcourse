import { Button, Form, Input } from "antd";

import { EmailPasswordLoginRequest } from "@/lib/models";

const EmailPasswordLoginForm = ({
  onFinish,
}: {
  onFinish: (request: EmailPasswordLoginRequest) => void;
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
        name="account"
        rules={[
          {
            max: 50,
            required: true,
            message: "请正确输入 jAccount 用户名",
          },
        ]}
      >
        <Input suffix="@sjtu.edu.cn" placeholder="jAccount 用户名" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入选课社区密码" }]}
      >
        <Input placeholder="密码" type="password" size="large" />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "100%" }}
          size="large"
        >
          使用密码登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EmailPasswordLoginForm;
