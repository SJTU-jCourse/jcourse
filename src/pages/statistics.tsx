import { Card, Col, Grid, Row, Statistic } from "antd";
import Head from "next/head";
import {
  Bar,
  BarChart,
  Brush,
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useStatistic } from "@/services/statistic";

const { useBreakpoint } = Grid;

const IntervalAxisTick = ({ x, y, payload }: any) => {
  console.log(x, y, payload);

  return (
    <g transform={`translate(${x + 8},${y})`}>
      <text y={0} dy={12} textAnchor="end" fill="#666">
        {payload.value < 5 ? `[${payload.value}, ${payload.value + 1})` : 5}
      </text>
    </g>
  );
};

const StatisticPage = () => {
  const { indexState, loading } = useStatistic();

  const screens = useBreakpoint();
  const numberColSpan = screens.sm ? 6 : 12;
  const figureColSpan = screens.xs ? 24 : 12;
  return (
    <div className="statistic">
      <Head>
        <title>统计 - SJTU选课社区</title>
      </Head>
      <Card title="基本统计">
        <Row
          className="info-row"
          gutter={16}
          justify="space-between"
          align="middle"
        >
          <Col span={numberColSpan}>
            <Statistic
              title="用户数"
              loading={loading}
              value={indexState?.user_count}
            />
          </Col>
          <Col span={numberColSpan}>
            <Statistic
              title="点评数"
              loading={loading}
              value={indexState?.review_count}
            />
          </Col>
          <Col span={numberColSpan}>
            <Statistic
              title="课程总数"
              loading={loading}
              value={indexState?.course_count}
            />
          </Col>
          <Col span={numberColSpan}>
            <Statistic
              title="已点评课程数"
              loading={loading}
              value={indexState?.course_with_review_count}
            />
          </Col>
        </Row>
      </Card>

      <Row>
        <Col span={figureColSpan}>
          <Card title="点评推荐指数分布">
            <ResponsiveContainer height={300}>
              <BarChart data={indexState?.review_rating_dist || []}>
                <Bar name="点评数量" dataKey="count" fill="#adc6ff"></Bar>
                <XAxis dataKey="value">
                  <Label value="推荐指数" offset={0} position="insideBottom" />
                </XAxis>
                <YAxis />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={figureColSpan}>
          <Card title="课程推荐指数分布">
            <ResponsiveContainer height={300}>
              <BarChart data={indexState?.course_review_avg_dist || []}>
                <Bar name="课程数量" dataKey="count" fill="#adc6ff" />
                <XAxis dataKey="value" tick={IntervalAxisTick}>
                  <Label value="推荐指数" offset={0} position="insideBottom" />
                </XAxis>
                <YAxis />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Card title="课程点评数量分布">
            <ResponsiveContainer height={300}>
              <BarChart data={indexState?.course_review_count_dist || []}>
                <Bar name="点评数量" dataKey="count" fill="#adc6ff"></Bar>
                <XAxis dataKey="value">
                  <Label value="点评数量" offset={0} position="insideBottom" />
                </XAxis>
                <YAxis />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={figureColSpan}>
          <Card title="新增用户">
            <ResponsiveContainer height={300}>
              <LineChart data={indexState?.user_join_time || []}>
                <Line type="monotone" dataKey="count" dot={false} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Brush />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={figureColSpan}>
          <Card title="新增点评">
            <ResponsiveContainer height={300}>
              <LineChart data={indexState?.review_create_time || []}>
                <Line type="monotone" dataKey="count" dot={false} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Brush />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StatisticPage;
