import { EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Menu, Row } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'umi';

const navMenuItems = [
  { key: '/latest', text: '最新', linkTo: '/latest' },
  { key: '/courses', text: '课程库', linkTo: '/courses' },
];

const NavBar = (props: { pathname: string }) => {
  const isXs: boolean = useMediaQuery({ query: '(max-width: 576px)' });

  const { pathname } = props;

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
            fontSize: 18,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            color: 'black',
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
            <Menu.Item key={item.key}>
              <Link to={item.linkTo}>{item.text}</Link>
            </Menu.Item>
          ))}
        </Menu>
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
        <Link to="/review">
          {isXs ? (
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
          ) : (
            <Button type="primary">写点评</Button>
          )}
        </Link>
      </Col>
    </Row>
  );
};

export default NavBar;
