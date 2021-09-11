import config from '@/config';
import { getUser } from '@/services/user';
import {
  EditOutlined,
  LogoutOutlined,
  ProfileOutlined,
  SearchOutlined,
  SyncOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Col, Dropdown, Grid, Menu, Row } from 'antd';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'umi';

const navMenuItems = [
  { key: '/latest', text: '最新', linkTo: '/latest' },
  { key: '/courses', text: '课程库', linkTo: '/courses' },
];
const { useBreakpoint } = Grid;

const NavBar = (props: { pathname: string }) => {
  const screens = useBreakpoint();
  const history = useHistory();
  const [username, setUsername] = useState<string>('');
  const { pathname } = props;
  useEffect(() => {
    getUser().then(() => {
      const account = Cookies.get('account');
      setUsername(account ? account : '');
    });
  }, [history]);
  const handleMenuClick = (e: { key: string }) => {
    if (e.key == 'activity') {
      history.push('/activity');
    } else if (e.key == 'sync') {
      history.push('/sync');
    } else if (e.key == 'logout') {
      window.location.href = '/oauth/logout';
    }
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
      {username != '' && (
        <Menu.Item key="account" icon={<UserOutlined />}>
          {username}
        </Menu.Item>
      )}
      <Menu.Item key="activity" icon={<ProfileOutlined />}>
        我的点评
      </Menu.Item>
      <Menu.Item key="sync" icon={<SyncOutlined />}>
        同步课表
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
        maxWidth: config.LAYOUT_WIDTH - 2 * config.LAYOUT_PADDING,
      }}
    >
      <Col>
        <Link
          to="/"
          style={{
            fontWeight: 600,
            fontSize: screens.xs ? 14 : 18,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            color: 'black',
            marginRight: screens.xs ? 0 : config.LAYOUT_PADDING,
          }}
        >
          SJTU选课社区
        </Link>
      </Col>

      <Col style={{ marginInline: 'auto' }} flex="auto">
        <Menu
          selectedKeys={[pathname]}
          style={{ height: 64, border: 0 }}
          mode="horizontal"
        >
          {navMenuItems.map((item) => (
            <Menu.Item key={item.key}>
              <Link to={item.linkTo}>{item.text}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Col>
      <Col>
        <Link to="/review">
          {screens.xs ? (
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
