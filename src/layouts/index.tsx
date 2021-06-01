import NavBar from '@/components/navbar';
import { Notice } from '@/models';
import { Alert, Layout, List, Space } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'umi';

const { Header, Content, Footer } = Layout;

const BasicLayout = (props: { location: { pathname: any }; children: any }) => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const isTabletOrMobile: boolean = useMediaQuery({
    query: '(max-width: 992px)',
  });

  const {
    location: { pathname },
    children,
  } = props;

  useEffect(() => {
    axios.get('/api/notice/').then((resp) => {
      setNotices(resp.data);
    });
  }, []);
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          padding: '0 16px',
          background: '#FFFFFF',
        }}
      >
        <NavBar pathname={pathname} />
      </Header>

      <Content
        style={{
          marginInline: 'auto',
          alignContent: 'center',
          width: isTabletOrMobile ? '100%' : 992,
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
                    marginInline: 16,
                    maxWidth: 960,
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

export default BasicLayout;
