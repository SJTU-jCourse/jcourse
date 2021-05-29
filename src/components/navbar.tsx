import { Menu, Col, Row, Button, Input } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { history } from 'umi';
const { Search } = Input;

const navMenuItems = [
  { key: '/latest', text: '最新', linkTo: '/latest' },
  { key: '/courses', text: '课程库', linkTo: '/courses' },
];

const NavBar = (props: { pathname: string }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 992px)' });
  const isXs = useMediaQuery({ query: '(max-width: 576px)' });

  const { pathname } = props;

  const onSearch = (value: string) => {
    history.push({ pathname: '/search', query: { q: value } });
  };
  return (
    <Row
      style={{
        marginInline: 'auto',
        paddingInline: 16,
        width: isTabletOrMobile ? '100%' : 992,
      }}
    >
      <Col style={{ display: isXs ? 'none' : 'inline-block' }}>
        <Link
          to="/"
          style={{
            fontSize: 20,
            fontStyle: 'strong',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            color: 'black',
          }}
        >
          SJTU选课社区
        </Link>
      </Col>

      <Col style={{ marginInline: 'auto' }}>
        <Menu selectedKeys={[pathname]} mode="horizontal" style={{ border: 0 }}>
          {navMenuItems.map((item) => (
            <Menu.Item key={item.key}>
              <Link to={item.linkTo}>{item.text}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Col>

      <Col>
        <Search
          style={{ verticalAlign: 'middle' }}
          placeholder="搜索课程名/课号/教师名"
          onSearch={onSearch}
        />
      </Col>
      <Col>
        <Link to="/review">
          <Button style={{ verticalAlign: 'middle' }} type="primary">
            写点评
          </Button>
        </Link>
      </Col>
    </Row>
  );
};

export default NavBar;
