import { Col, Grid, Input, Row, Statistic, Typography } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import {
  Brush,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useStatistic } from "@/services/statistic";

const { Title } = Typography;
const { useBreakpoint } = Grid;

const StatisticPage = () => {
  const { indexState, loading } = useStatistic();
  const router = useRouter();

  const onSearch = (value: string) => {
    router.push({ pathname: "/search", query: { q: value } });
  };

  const inputRef = useRef<any>(null);

  useEffect(() => {
    inputRef.current?.focus({ cursor: "end" });
  }, []);

  const screens = useBreakpoint();
  const numberColSpan = screens.sm ? 6 : 12;
  const figureColSpan = screens.xs ? 24 : 12;
  return (
    <div className="statistic">
      <Head>
        <title>统计 - SJTU选课社区</title>
      </Head>
      <Title className="slogan-title" level={2}>
        分享一点选课的经验
      </Title>
      <Input.Search
        size="large"
        placeholder="搜索课程名/课号/教师姓名/教师姓名拼音"
        onSearch={onSearch}
        ref={inputRef}
        className="search-input"
      />
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
            value={indexState?.users}
          />
        </Col>
        <Col span={numberColSpan}>
          <Statistic
            title="点评数"
            loading={loading}
            value={indexState?.reviews}
          />
        </Col>
        <Col span={numberColSpan}>
          <Statistic
            title="课程总数"
            loading={loading}
            value={indexState?.courses}
          />
        </Col>
        <Col span={numberColSpan}>
          <Statistic
            title="已点评课程数"
            loading={loading}
            value={indexState?.courses_with_review}
          />
        </Col>
      </Row>
      <Row>
        <Col span={figureColSpan}>
          <div style={{ textAlign: "center" }}>新增用户</div>
          <ResponsiveContainer height={300}>
            <LineChart data={indexState?.user_join || []}>
              <Line type="monotone" dataKey="count" dot={false} />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Brush />
            </LineChart>
          </ResponsiveContainer>
        </Col>
        <Col span={figureColSpan}>
          <div style={{ textAlign: "center" }}>新增点评</div>

          <ResponsiveContainer height={300}>
            <LineChart data={indexState?.review_create || []}>
              <Line type="monotone" dataKey="count" dot={false} />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Brush />
            </LineChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </div>
  );
};

export default StatisticPage;
