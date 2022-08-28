import AboutCard from "@/components/about-card";
import { auth, login } from "@/services/user";
import { Button, Modal, Spin, Typography, message, Grid, Divider } from "antd";
import { useEffect } from "react";
import { useRouter } from "next/router";
import LoginForm from "@/components/login-form";

const { Link, Text } = Typography;
const { useBreakpoint } = Grid;

const LoginPage = () => {
  const router = useRouter();
  const [modal, contextHolder] = Modal.useModal();
  const { code, state } = router.query;
  const screens = useBreakpoint();
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
      <Spin spinning={code ? true : false} />
      <Button
        style={{ width: "100%" }}
        size="large"
        type="primary"
        onClick={() => login(router.basePath)}
      >
        使用 jAccount 登录
      </Button>
      <Divider plain>或</Divider>
      <LoginForm />

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
