import { Button, Layout } from 'antd';
const { Header, Content } = Layout;
const Login = () => {
  return (
    <Layout style={{ height: '100vh' }}>
      <Header
        style={{
          padding: '0 16px',
          background: '#FFFFFF',
          fontWeight: 600,
          fontSize: 20,
        }}
      >
        SJTU选课社区
      </Header>

      <Content style={{ width: '100%', height: '100%', textAlign: 'center' }}>
        <Button
          size="large"
          type="primary"
          style={{ top: '45%' }}
          href="oauth/jaccount/login/"
        >
          使用 jAccount 登录
        </Button>
      </Content>
    </Layout>
  );
};

export default Login;
