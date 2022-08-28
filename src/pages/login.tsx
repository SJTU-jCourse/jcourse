import AboutCard from "@/components/about-card";
import { auth, login } from "@/services/user";
import {
  Button,
  Modal,
  Space,
  Spin,
  Typography,
  message,
  Grid,
  Divider,
} from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loginform from "@/components/login-form";

const { Link, Text } = Typography;
const { useBreakpoint } = Grid;

const LoginPage = () => {
  const router = useRouter();
  const [modal, contextHolder] = Modal.useModal();
  const { code, state } = router.query;
  const screens = useBreakpoint();
  const [isButtonVisible, setIsButtonVisible] = useState("default");
  const [isFormVisible, setIsFormVisible] = useState("none");

  function testlogin() {
    setIsButtonVisible("none");
    setIsFormVisible("block");
  }

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
    <>
      <Space direction="vertical" align="center" size="large">
        <Spin spinning={code ? true : false} />
        {screens.xs ? (
          <>
            <div style={{ display: isFormVisible }}>
              <Loginform />
              <Divider />
            </div>
            <Button
              size="large"
              style={{ display: isButtonVisible }}
              onClick={testlogin}
            >
              使用 .sjtu邮箱 登录
            </Button>
            <Button
              size="large"
              type="primary"
              onClick={() => login(router.basePath)}
            >
              使用 jAccount 登录
            </Button>
          </>
        ) : (
          <Space>
            <Button
              size="large"
              type="primary"
              onClick={() => login(router.basePath)}
            >
              使用 jAccount 登录
            </Button>
            <> </>
            <Button
              size="large"
              style={{ display: isButtonVisible }}
              onClick={testlogin}
            >
              使用 .sjtu邮箱 登录
            </Button>
            <div style={{ display: isFormVisible }}>
              <Divider
                type="vertical"
                style={{ height: "250px", width: "15px" }}
              />
            </div>
            <div style={{ display: isFormVisible }}>
              <Loginform />
            </div>
          </Space>
        )}
        <Text>
          登录即表示您已阅读并同意本站
          <Link onClick={() => info()}>基本原则</Link>。{contextHolder}
        </Text>
      </Space>
    </>
  );
};

export default LoginPage;
