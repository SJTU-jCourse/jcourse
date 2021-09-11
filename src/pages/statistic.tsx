import config from '@/config';
import { StatisticInfo } from '@/models';
import { getStatistic } from '@/services/statistic';
import { Col, Row, Spin, Statistic, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'umi';

const { Title } = Typography;

const Index = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [indexState, setIndexState] = useState<StatisticInfo>({
    users: 0,
    courses: 0,
    reviews: 0,
  });
  useEffect(() => {
    getStatistic().then((statistic) => {
      setLoading(false);
      setIndexState(statistic);
    });
  }, []);

  return (
    <>
      <Title
        style={{ marginTop: config.LAYOUT_PADDING * 2, textAlign: 'center' }}
        level={2}
      >
        分享一点选课的经验
      </Title>
      <Row
        style={{ textAlign: 'center', marginBlock: config.LAYOUT_PADDING * 4 }}
        gutter={16}
        justify="space-between"
        align="middle"
      >
        <Col span={8}>
          {loading ? (
            <Spin />
          ) : (
            <Statistic title="用户数" value={indexState.users} />
          )}
        </Col>
        <Col span={8}>
          {loading ? (
            <Spin />
          ) : (
            <Link to="/latest">
              <Statistic title="点评数" value={indexState.reviews} />
            </Link>
          )}
        </Col>
        <Col span={8}>
          {loading ? (
            <Spin />
          ) : (
            <Link to="/courses">
              <Statistic title="课程数" value={indexState.courses} />
            </Link>
          )}
        </Col>
      </Row>
    </>
  );
};

export default Index;
