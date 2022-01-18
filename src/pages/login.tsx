import AboutContent from '@/components/about-card';
import config from '@/config';
import { auth } from '@/services/user';
import useUrlState from '@ahooksjs/use-url-state';
import { Button, Modal, Space, Spin, Typography, message } from 'antd';
import { useEffect } from 'react';
import { history } from 'umi';

const { Link, Text } = Typography;

function info() {
  Modal.info({
    title: '基本原则',
    content: <AboutContent />,
    okText: '确认',
    icon: null,
  });
}

const LoginPage = () => {
  const [urlState, setUrlState] = useUrlState({ code: null });
  const jAccountUri = `https://jaccount.sjtu.edu.cn/oauth2/authorize?client_id=${config.JACCOUNT_CLIENT_ID}&redirect_uri=${config.JACCOUNT_LOGIN_RETURI}&response_type=code&scope=basic`;
  useEffect(() => {
    if (urlState.code) {
      auth(urlState.code)
        .then((data) => {
          localStorage.setItem('account', data.account);
          history.push('/');
        })
        .catch(() => {
          message.error('参数错误！');
          setUrlState({ code: undefined });
        });
    }
  }, [urlState]);
  return (
    <>
      <Space direction="vertical" align="center" size="large">
        <Spin spinning={urlState.code} />
        <Button size="large" type="primary" href={jAccountUri}>
          使用 jAccount 登录
        </Button>
        <Text>
          登录即表示您已阅读并同意本站
          <Link onClick={() => info()}>基本原则</Link>。
        </Text>
      </Space>
    </>
  );
};

export default LoginPage;
