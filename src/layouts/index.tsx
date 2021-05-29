import { Layout, Space, Alert, List } from 'antd';
import { Link } from 'react-router-dom';
import NavBar from '@/components/navbar';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';
import axios from 'axios';

const { Header, Content, Footer } = Layout;

const BasicLayout = (props: { location: { pathname: any }; children: any }) => {
  const [notices, setNotices] = useState<string[]>([]);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 992px)' });

  const {
    location: { pathname },
    children,
  } = props;

  useEffect(() => {
    axios.get('/api/notices').then((resp) => {
      setNotices(resp.data);
    });
  }, []);
  return (
    <Layout>
      <Header
        style={{
          padding: 0,
          background: '#FFFFFF',
        }}
      >
        <NavBar pathname={pathname} />
      </Header>

      <Content
        style={{
          marginInline: 'auto',
          alignContent: 'center',
          paddingTop: 16,
          width: isTabletOrMobile ? '100%' : 992,
          paddingInline: 16,
        }}
      >
        {notices.length > 0 && (
          <List
            dataSource={notices}
            split={false}
            itemLayout="vertical"
            renderItem={(notice) => (
              <List.Item key={notice}>
                <Alert message={notice} banner type="info" />
              </List.Item>
            )}
          />
        )}

        {children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <Space>
          <div>SJTU选课社区 ©2021</div>
          <Link to="/about">常见问题</Link>
          <Link to="/report">反馈</Link>
        </Space>
      </Footer>
    </Layout>
  );
};

export default BasicLayout;
