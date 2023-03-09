import { Button, Form, Input } from "antd";

import { EmailPasswordLoginRequest } from "@/lib/models";
import { AccountRule } from "@/lib/utils";

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
      <Form.Item name="account" rules={[AccountRule]}>
        <Input suffix="@sjtu.edu.cn" placeholder="jAccount 用户名" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入选课社区密码" }]}
      >
        <Input.Password placeholder="选课社区密码" size="large" />
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
