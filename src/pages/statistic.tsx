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
        style={{ marginTop: config.LAYOUT_MARGIN * 2, textAlign: 'center' }}
        level={2}
      >
        分享一点选课的经验
      </Title>
      <Row
        style={{ textAlign: 'center', marginBlock: config.LAYOUT_MARGIN * 4 }}
        gutter={16}
        justify="space-between"
        align="middle"
      >
        <Col span={8}>
          <Spin spinning={loading}>
            <Statistic title="用户数" value={indexState.users} />
          </Spin>
        </Col>
        <Col span={8}>
          <Spin spinning={loading}>
            <Link to="/latest">
              <Statistic title="点评数" value={indexState.reviews} />
            </Link>
          </Spin>
        </Col>
        <Col span={8}>
          <Spin spinning={loading}>
            <Link to="/courses">
              <Statistic title="课程数" value={indexState.courses} />
            </Link>
          </Spin>
        </Col>
      </Row>
    </>
  );
};

export default Index;
