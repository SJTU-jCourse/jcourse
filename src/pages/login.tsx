import AboutCard from "@/components/about-card";
import { jAccountAuth, jAccountLogin, postLogin } from "@/services/user";
import { Button, Modal, Typography, message, Tabs } from "antd";
import { useEffect } from "react";
import { useRouter } from "next/router";
import LoginForm from "@/components/login-form";

const { Link, Text } = Typography;

const LoginPage = () => {
  const router = useRouter();
  const [modal, contextHolder] = Modal.useModal();
  const { code, state, next } = router.query;
  useEffect(() => {
    if (code) {
      jAccountAuth(
        code as string,
        state as string,
        router.basePath,
        next as string
      )
        .then((data) => {
          postLogin(data, router);
        })
        .catch(() => {
          message.error("参数错误！");
          router.replace("/login");
        });
    }
  }, [router.query]);

  function info() {
    modal.info({
      title: "基本原则",
      content: <AboutCard />,
      okText: "确认",
      icon: null,
    });
  }

  const tabItems = [
    {
      label: "快速登录",
      key: "jaccount",
      children: (
        <div style={{ height: "168px", display: "flex" }}>
          <Button
            style={{
              width: "100%",
              alignSelf: "center",
            }}
            size="large"
            type="primary"
            loading={code ? true : false}
            onClick={() => jAccountLogin(router.basePath, next as string)}
          >
            使用 jAccount 登录
          </Button>
        </div>
      ),
    },
    {
      label: "邮箱登录",
      key: "email",
      children: (
        <div style={{ height: "168px" }}>
          <LoginForm />
        </div>
      ),
    },
  ];

  return (
    <div style={{ minWidth: "324px", marginInline: "auto" }}>
      <Tabs defaultActiveKey="jaccount" centered items={tabItems}></Tabs>
      <div style={{ textAlign: "center", marginTop: 16 }}>
        <Text>
          登录即表示您已阅读并同意本站
          <Link onClick={() => info()}>基本原则</Link>。{contextHolder}
        </Text>
      </div>
    </div>
  );
};

export default LoginPage;
