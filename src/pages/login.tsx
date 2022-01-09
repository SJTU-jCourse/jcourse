import AboutContent from '@/components/about-card';
import config from '@/config';
import { auth } from '@/services/user';
import useUrlState from '@ahooksjs/use-url-state';
import { Button, Layout, Modal, Space, Typography, message } from 'antd';
import { useEffect } from 'react';
import { history } from 'umi';
const { Header, Content } = Layout;
const { Link } = Typography;

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
    <Layout style={{ height: '100vh' }}>
      <Header
        style={{
          padding: `0 ${config.LAYOUT_MARGIN}px`,
          fontSize: 20,
        }}
      >
        <div className="title">SJTU选课社区</div>
      </Header>
      <Content
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Space direction="vertical" align="center" size="large">
          <Button size="large" type="primary" href={jAccountUri}>
            使用 jAccount 登录
          </Button>
          <span>
            登录即表示您已阅读并同意本站
            <Link onClick={() => info()}>基本原则</Link>。
          </span>
        </Space>
      </Content>
    </Layout>
  );
};

export default LoginPage;
