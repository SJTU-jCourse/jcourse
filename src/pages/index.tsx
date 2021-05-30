import { Row, Col, Statistic, Typography, Spin } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const Index = () => {
  const [indexState, setIndexState] = useState({
    loading: true,
    statistic: { courses: 0, reviews: 0 },
  });
  useEffect(() => {
    setIndexState({ loading: true, statistic: { courses: 0, reviews: 0 } });
    axios.get('/api/statistic').then((repos) => {
      setIndexState({ loading: false, statistic: repos.data });
    });
  }, []);

  return (
    <>
      <Title style={{ marginTop: 32, textAlign: 'center' }} level={2}>
        分享一点选课的经验
      </Title>
      <Row
        style={{ textAlign: 'center', marginBlock: 56 }}
        gutter={16}
        justify="space-between"
        align="middle"
      >
        <Col span={12}>
          {indexState.loading ? (
            <Spin />
          ) : (
            <Link to="/latest">
              <Statistic title="点评数" value={indexState.statistic.reviews} />
            </Link>
          )}
        </Col>
        <Col span={12}>
          {indexState.loading ? (
            <Spin />
          ) : (
            <Link to="/courses">
              <Statistic title="课程数" value={indexState.statistic.courses} />
            </Link>
          )}
        </Col>
      </Row>
    </>
  );
};

export default Index;
