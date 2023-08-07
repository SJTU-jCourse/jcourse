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

import PageHeader from "@/components/page-header";
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
    <>
      <Head>
        <title>统计 - SJTU选课社区</title>
      </Head>
      <PageHeader title="统计" />
      <Card title="基本统计">
        <Row
          className="info-row"
          gutter={16}
          justify="space-between"
          align="middle"
        >
          <Col span={numberColSpan}>
            <Statistic
              title="用户总数"
              loading={loading}
              value={indexState?.user_count}
            />
          </Col>
          <Col span={numberColSpan}>
            <Statistic
              title="点评总数"
              loading={loading}
              value={indexState?.review_count}
            />
          </Col>
          <Col span={numberColSpan}>
            <Statistic
              title="用户新增"
              loading={loading}
              value={indexState?.daily_new_users}
            />
          </Col>
          <Col span={numberColSpan}>
            <Statistic
              title="点评新增"
              loading={loading}
              value={indexState?.daily_new_reviews}
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
            <ResponsiveContainer height={200}>
              <BarChart
                data={indexState?.review_rating_dist || []}
                margin={{ left: 0, right: 0, top: 5, bottom: 5 }}
              >
                <XAxis dataKey="value">
                  <Label value="推荐指数" offset={0} position="insideBottom" />
                </XAxis>
                <YAxis />
                <Tooltip />
                <Bar name="点评数量" dataKey="count" fill="#adc6ff"></Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={figureColSpan}>
          <Card title="课程推荐指数分布">
            <ResponsiveContainer height={200}>
              <BarChart
                data={indexState?.course_review_avg_dist || []}
                margin={{ left: 0, right: 0, top: 5, bottom: 5 }}
              >
                <XAxis dataKey="value" tick={IntervalAxisTick}>
                  <Label value="推荐指数" offset={0} position="insideBottom" />
                </XAxis>
                <YAxis />
                <Tooltip />
                <Bar name="课程数量" dataKey="count" fill="#adc6ff" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Card title="课程点评数量分布">
            <ResponsiveContainer height={200}>
              <BarChart
                data={indexState?.course_review_count_dist || []}
                margin={{ left: 0, right: 0, top: 5, bottom: 5 }}
              >
                <XAxis dataKey="value">
                  <Label value="点评数量" offset={0} position="insideBottom" />
                </XAxis>
                <YAxis />
                <Tooltip />
                <Bar name="课程数量" dataKey="count" fill="#adc6ff"></Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={figureColSpan}>
          <Card title="新增用户">
            <ResponsiveContainer height={200}>
              <LineChart
                data={indexState?.user_join_time || []}
                margin={{ left: 0, right: 0, top: 5, bottom: 5 }}
              >
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" dot={false} />
                <Brush />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={figureColSpan}>
          <Card title="新增点评">
            <ResponsiveContainer height={200}>
              <LineChart
                data={indexState?.review_create_time || []}
                margin={{ left: 0, right: 0, top: 5, bottom: 5 }}
              >
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" dot={false} />
                <Brush />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default StatisticPage;
