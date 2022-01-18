import './dark.css';
import './custom.ant.css';
import './custom.dark.css';

import NavBar from '@/components/navbar';
import NoticeList from '@/components/notice-list';
import config from '@/config';
import { Notice } from '@/models';
import { getNotices } from '@/services/notice';
import { ConfigProvider, Layout, Space } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { ReactNode, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link, useLocation } from 'umi';

const { Header, Content, Footer } = Layout;

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

const BasicLayout = (props: {
  location: { pathname: string };
  children: ReactNode;
}) => {
  const [notices, setNotices] = useState<Notice[]>([]);

  const {
    location: { pathname },
    children,
  } = props;

  useEffect(() => {
    getNotices().then((resp) => {
      setNotices(resp);
    });
  }, []);
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          paddingInline: config.LAYOUT_MARGIN,
        }}
      >
        <NavBar pathname={pathname} />
      </Header>

      <Content
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          alignContent: 'center',
          width: '100%',
          maxWidth: config.LAYOUT_WIDTH,
        }}
      >
        {notices && notices.length > 0 && <NoticeList notices={notices} />}
        {children}
        <ScrollToTop />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <Space>
          <Link to="/about">关于</Link>
          <Link to="/faq">常见问题</Link>
          <Link to="/report">反馈</Link>
        </Space>
        <div>©2022 SJTU选课社区</div>
      </Footer>
    </Layout>
  );
};

const LoginLayout = (props: { children: ReactNode }) => (
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
      {props.children}
    </Content>
  </Layout>
);
export default (props: {
  location: { pathname: string };
  children: ReactNode;
}) => {
  const isDark = useMediaQuery({
    query: '(prefers-color-scheme: dark)',
  });
  return (
    <ConfigProvider locale={zhCN} prefixCls={isDark ? 'dark' : 'ant'}>
      {props.location.pathname == '/login' ? (
        <LoginLayout {...props} />
      ) : (
        <BasicLayout {...props} />
      )}
    </ConfigProvider>
  );
};
