import NavBar from '@/components/navbar';
import config from '@/config';
import { Notice } from '@/models';
import { getNotices } from '@/services/notice';
import { Alert, ConfigProvider, Layout, List, Space } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { ReactNode, useEffect, useState } from 'react';
import { Link } from 'umi';

const { Header, Content, Footer } = Layout;
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
          padding: `0 ${config.LAYOUT_PADDING}px`,
          background: '#FFFFFF',
        }}
      >
        <NavBar pathname={pathname} />
      </Header>

      <Content
        style={{
          marginInline: 'auto',
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
              <List.Item key={notice.title}>
                <Alert
                  message={notice.message}
                  banner
                  type="info"
                  style={{
                    alignContent: 'center',
                    marginInline: config.LAYOUT_PADDING,
                    maxWidth: config.LAYOUT_WIDTH - 2 * config.LAYOUT_PADDING,
                  }}
                />
              </List.Item>
            )}
          />
        )}
        {children}
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
