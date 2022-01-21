import { StatisticInfo } from '@/models';
import { getStatistic } from '@/services/statistic';
import { useRequest } from 'ahooks';
import { Col, Row, Spin, Statistic, Typography } from 'antd';
import { Link } from 'umi';

const { Title } = Typography;

const StatisticPage = () => {
  const { data: indexState, loading } = useRequest<StatisticInfo, []>(
    getStatistic,
  );

  return (
    <div className="statistic">
      <Title className="slogan-title" level={2}>
        分享一点选课的经验
      </Title>
      <Row
        className="info-row"
        gutter={16}
        justify="space-between"
        align="middle"
      >
        <Col span={8}>
          <Spin spinning={loading}>
            {indexState && (
              <Statistic title="用户数" value={indexState.users} />
            )}
          </Spin>
        </Col>
        <Col span={8}>
          <Spin spinning={loading}>
            <Link to="/latest">
              {indexState && (
                <Statistic title="点评数" value={indexState.reviews} />
              )}
            </Link>
          </Spin>
        </Col>
        <Col span={8}>
          <Spin spinning={loading}>
            <Link to="/courses">
              {indexState && (
                <Statistic title="课程数" value={indexState.courses} />
              )}
            </Link>
          </Spin>
        </Col>
      </Row>
    </div>
  );
};

export default StatisticPage;
