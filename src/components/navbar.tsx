import { getUser } from '@/services/user';
import {
  EditOutlined,
  LogoutOutlined,
  ProfileOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Col, Dropdown, Menu, Row } from 'antd';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link, useHistory } from 'umi';

const navMenuItems = [
  { key: '/latest', text: '最新', linkTo: '/latest' },
  { key: '/courses', text: '课程库', linkTo: '/courses' },
];

const NavBar = (props: { pathname: string }) => {
  const isXs: boolean = useMediaQuery({ query: '(max-width: 576px)' });
  const history = useHistory();
  const [username, setUsername] = useState<string>('');
  const { pathname } = props;
  useEffect(() => {
    getUser().then((user) => {
      const account = Cookies.get('account');
      if (account) setUsername(account);
    });
  }, [history]);
  const handleMenuClick = (e: { key: string }) => {
    if (e.key == 'activity') {
      history.push('/activity');
    } else if (e.key == 'logout') {
      window.location.href = '/oauth/logout';
    }
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item icon={<UserOutlined />}>{username}</Menu.Item>
      <Menu.Item key="activity" icon={<ProfileOutlined />}>
        活动
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item danger key="logout" icon={<LogoutOutlined />}>
        登出
      </Menu.Item>
    </Menu>
  );

  return (
    <Row
      style={{
        alignContent: 'center',
        marginInline: 'auto',
        maxWidth: 960,
      }}
    >
      <Col>
        <Link
          to="/"
          style={{
            fontWeight: 600,
            fontSize: isXs ? 14 : 18,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            color: 'black',
            marginRight: isXs ? 0 : 16,
          }}
        >
          SJTU选课社区
        </Link>
      </Col>

      <Col style={{ marginInline: 'auto' }} flex="auto">
        <Menu
          selectedKeys={[pathname]}
          mode="horizontal"
          style={{ border: 0, height: 64 }}
        >
          {navMenuItems.map((item) => (
            <Menu.Item key={item.key} style={{ margin: '0 10px' }}>
              <Link to={item.linkTo}>{item.text}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Col>
      <Col>
        <Link to="/review">
          {isXs ? (
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
          ) : (
            <Button type="primary">写点评</Button>
          )}
        </Link>
      </Col>
      <Col>
        <Link to="/search">
          <Button
            shape="circle"
            icon={<SearchOutlined />}
            style={{ margin: 8 }}
          />
        </Link>
      </Col>

      <Col>
        <Dropdown overlay={menu} placement="bottomCenter">
          <Button shape="circle" icon={<UserOutlined />}></Button>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default NavBar;
