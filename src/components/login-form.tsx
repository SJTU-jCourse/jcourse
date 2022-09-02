import { sendCode, verifyCode } from "@/services/user";
import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const LoginForm = () => {
  const [form] = Form.useForm();
  const [time, setTime] = useState<number>(0);
  const timeRef = useRef();
  const inCounter = time != 0;
  const router = useRouter();

  const onFinish = () => {
    verifyCode(form.getFieldValue("email"), form.getFieldValue("code"))
      .then((data) => {
        localStorage.setItem("account", data.account);
        router.push("/");
      })
      .catch(() => {
        message.error("验证码错误！");
      });
  };

  const onClick = () => {
    setTime(60);
    sendCode(form.getFieldValue("email")).then((resp) => {
      if (resp.status === 200) {
        message.success("发送成功！");
      } else {
        message.error("发送失败！");
      }
    });
  };

  useEffect(() => {
    if (inCounter) {
      timeRef.current = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }
    return () => {
      clearTimeout(timeRef.current);
    };
  }, [time]);
  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="horizontal"
      requiredMark="optional"
      size="large"
    >
      <Form.Item
        name="email"
        rules={[
          {
            max: 50,
            pattern: /^([a-zA-Z0-9]+[-_\.]?)+@+(sjtu.edu.cn)+$/,
            required: true,
            message: "请正确输入邮箱地址",
          },
        ]}
      >
        <Input placeholder="@sjtu.edu.cn 邮箱" />
      </Form.Item>

      <Form.Item
        name="code"
        rules={[{ required: true, message: "请输入验证码" }]}
      >
        <Input.Search
          placeholder="输入验证码"
          enterButton={
            <Button onClick={onClick} disabled={inCounter}>
              {inCounter ? `${time}秒后` : "获取验证码"}
            </Button>
          }
          size="large"
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "100%" }}
          size="large"
        >
          使用邮箱登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
