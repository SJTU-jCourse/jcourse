import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import { ResetPasswordRequest } from "@/lib/models";
import { AccountRule, CodeRule } from "@/lib/utils";
import { resetEmailSendCode, resetPassword } from "@/services/user";

const ResetPasswordForm = ({
  onSuccessFinish,
}: {
  onSuccessFinish?: () => void;
}) => {
  const [form] = Form.useForm();
  const [time, setTime] = useState<number>(0);
  const timeRef = useRef<any>();
  const inCounter = time != 0;
  const router = useRouter();

  const onClick = () => {
    resetEmailSendCode(form.getFieldValue("account"))
      .then((data) => {
        setTime(60);
        message.success(data.detail);
      })
      .catch((error) => {
        message.error(error.response.data.detail);
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

  const onFinish = (request: ResetPasswordRequest) => {
    resetPassword(request.account, request.code, request.password)
      .then((data) => {
        message.success(data.detail, undefined, () => {
          router.reload();
        });
        if (onSuccessFinish) onSuccessFinish();
      })
      .catch((error) => {
        message.error(error.response.data.detail);
      });
  };
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

      <Form.Item name="code" rules={[CodeRule]}>
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

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            min: 9,
            pattern: /^.*(?=.*\d)(?=.*[a-zA-Z]{1,}).*$/,
            message: "请输入满足规则的密码（至少9位，并包含数字和字母）",
          },
        ]}
      >
        <Input.Password placeholder="输入新密码" size="large" />
      </Form.Item>

      <Form.Item
        name="repeat-password"
        dependencies={["password"]}
        rules={[
          { required: true, message: "请重复选课社区密码" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("两次输入密码不匹配！"));
            },
          }),
        ]}
      >
        <Input.Password placeholder="重复新密码" size="large" />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "100%" }}
          size="large"
        >
          重置密码
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ResetPasswordForm;
