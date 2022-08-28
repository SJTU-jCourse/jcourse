import { Button, Form, Input, Space } from "antd";

const Loginform = () => {
  return (
    <>
      <Form labelCol={{ flex: "100px" }}>
        <Form.Item
          label="邮箱地址"
          name="mailaddress"
          rules={[
            {
              max: 50,
              pattern: /^([a-zA-Z0-9]+[-_\.]?)+@sjtu.edu.cn$/,
              required: true,
              message: "请正确输入邮箱地址",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Space>
          <Form.Item
            label="验证码"
            name="code"
            rules={[{ required: true, message: "请输入验证码" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button>发送验证码</Button>
          </Form.Item>
        </Space>

        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Loginform;
