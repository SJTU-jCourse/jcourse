import AboutCard from "@/components/about-card";
import { auth, login, verifyCode } from "@/services/user";
import { Button, Modal, Typography, message, Tabs } from "antd";
import { useEffect } from "react";
import { useRouter } from "next/router";
import LoginForm from "@/components/login-form";

const { Link, Text } = Typography;

const LoginPage = () => {
  const router = useRouter();
  const [modal, contextHolder] = Modal.useModal();
  const { code, state } = router.query;
  useEffect(() => {
    if (code) {
      auth(code as string, state as string, router.basePath)
        .then((data) => {
          localStorage.setItem("account", data.account);
          router.push("/");
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

  return (
    <div style={{ minWidth: "324px", marginInline: "auto" }}>
      <Tabs defaultActiveKey="jaccount" centered>
        <Tabs.TabPane tab="快速登录" key="jaccount">
          <div style={{ height: "168px", display: "flex" }}>
            <Button
              style={{
                width: "100%",
                alignSelf: "center",
              }}
              size="large"
              type="primary"
              loading={code ? true : false}
              onClick={() => login(router.basePath)}
            >
              使用 jAccount 登录
            </Button>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="邮箱登录" key="email">
          <div style={{ height: "168px" }}>
            <LoginForm />
          </div>
        </Tabs.TabPane>
      </Tabs>

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
