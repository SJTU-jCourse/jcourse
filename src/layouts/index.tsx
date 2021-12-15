import NavBar from '@/components/navbar';
import config from '@/config';
import { Notice } from '@/models';
import { getNotices } from '@/services/notice';
import { Alert, ConfigProvider, Layout, List, Space } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { ReactNode, useEffect, useState } from 'react';
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
        {notices && notices.length > 0 && (
          <List
            dataSource={notices}
            split={false}
            itemLayout="vertical"
            renderItem={(notice: Notice) => (
              <List.Item
                key={notice.title}
                style={{ padding: 0, marginTop: config.LAYOUT_MARGIN }}
              >
                <Alert
                  message={notice.message}
                  banner
                  type="info"
                  style={{
                    alignContent: 'center',
                    marginLeft: config.LAYOUT_MARGIN,
                    marginRight: config.LAYOUT_MARGIN,
                    maxWidth: config.LAYOUT_WIDTH - 2 * config.LAYOUT_MARGIN,
                  }}
                />
              </List.Item>
            )}
          />
        )}
        {children}
        <ScrollToTop />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <Space>
          <Link to="/about">关于</Link>
          <Link to="/faq">常见问题</Link>
          <Link to="/report">反馈</Link>
        </Space>
        <div>SJTU选课社区 ©2021</div>
      </Footer>
    </Layout>
  );
};

export default (props: {
  location: { pathname: string };
  children: ReactNode;
}) => (
  <ConfigProvider locale={zhCN}>
    <BasicLayout {...props} />
  </ConfigProvider>
);
