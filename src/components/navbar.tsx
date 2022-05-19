import { logout, toAdmin } from '@/services/user';
import {
  DollarOutlined,
  EditOutlined,
  LogoutOutlined,
  ProfileOutlined,
  SearchOutlined,
  SyncOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Col, Dropdown, Grid, Menu, Row } from 'antd';
import { Link, useHistory, useModel } from 'umi';

const { useBreakpoint } = Grid;

const NavBar = (props: { pathname: string }) => {
  const screens = useBreakpoint();
  const history = useHistory();
  const { pathname } = props;
  const { initialState } = useModel('@@initialState');
  const handleMenuClick = (e: { key: string }) => {
    if (e.key == 'activity') {
      history.push('/activity');
    } else if (e.key == 'sync') {
      history.push('/sync');
    } else if (e.key == 'logout') {
      logout();
    } else if (e.key == 'account' && initialState!.user.is_staff) {
      toAdmin();
    } else if (e.key == 'point') {
      history.push('/point');
    }
  };
  const dropMenuItems = [
    {
      key: 'account',
      label: initialState?.user?.account,
      icon: <UserOutlined />,
    },
    { key: 'point', label: '社区积分', icon: <DollarOutlined /> },
    { key: 'activity', label: '我的点评', icon: <ProfileOutlined /> },
    { key: 'sync', label: '同步课表', icon: <SyncOutlined /> },
    { type: 'divider', key: 'divider' },
    { key: 'logout', label: '登出', icon: <LogoutOutlined />, danger: true },
  ];

  const navMenuItems = [
    { key: '/latest', label: <Link to="/latest">最新</Link> },
    { key: '/courses', label: <Link to="/courses">课程库</Link> },
  ];
  return (
    <Row className="navbar">
      <Col>
        <Link className="title" to="/">
          SJTU选课社区
        </Link>
      </Col>

      <Col className="col-menu" flex="auto">
        <Menu
          selectedKeys={[pathname]}
          className="menu"
          mode="horizontal"
          items={navMenuItems}
        ></Menu>
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
            className="search-button"
          />
        </Link>
      </Col>

      <Col>
        <Dropdown
          overlay={
            <Menu onClick={handleMenuClick} items={dropMenuItems}></Menu>
          }
          placement="bottom"
        >
          <Button shape="circle" icon={<UserOutlined />}></Button>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default NavBar;
