import AboutContent from '@/components/about-card';
import config from '@/config';
import { Button, Layout, Modal, Space, Typography } from 'antd';
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

const Login = () => {
  return (
    <Layout style={{ height: '100vh' }}>
      <Header
        style={{
          padding: `0 ${config.LAYOUT_MARGIN}px`,
          background: '#FFFFFF',
          fontWeight: 600,
          fontSize: 20,
        }}
      >
        SJTU选课社区
      </Header>
      <Content
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Space direction="vertical" align="center" size="large">
          <Button size="large" type="primary" href="oauth/jaccount/login/">
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

export default Login;
