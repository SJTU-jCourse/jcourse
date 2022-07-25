import AboutCard from "@/components/about-card";
import { auth, login } from "@/services/user";
import { Button, Modal, Space, Spin, Typography, message } from "antd";
import { useEffect } from "react";
import { useRouter } from "next/router";

const { Link, Text } = Typography;

const LoginPage = () => {
  const router = useRouter();
  const [modal, contextHolder] = Modal.useModal();
  const { code } = router.query;

  useEffect(() => {
    if (code) {
      auth(code as string, router.basePath)
        .then((data) => {
          localStorage.setItem("account", data.account);
          router.push("/");
        })
        .catch(() => {
          message.error("参数错误！");
          router.replace("/login");
        });
    }
  }, [code]);

  function info() {
    modal.info({
      title: "基本原则",
      content: <AboutCard />,
      okText: "确认",
      icon: null,
    });
  }

  return (
    <>
      <Space direction="vertical" align="center" size="large">
        <Spin spinning={code ? true : false} />
        <Button
          size="large"
          type="primary"
          onClick={() => login(router.basePath)}
        >
          使用 jAccount 登录
        </Button>
        <Text>
          登录即表示您已阅读并同意本站
          <Link onClick={() => info()}>基本原则</Link>。{contextHolder}
        </Text>
      </Space>
    </>
  );
};

export default LoginPage;
