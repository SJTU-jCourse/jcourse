import { Card, Descriptions, Empty, Skeleton, Table, Typography } from "antd";
import Head from "next/head";

import PageHeader from "@/components/page-header";
import { useUserPoint } from "@/services/user";

const { Title, Paragraph } = Typography;

const PointPage = () => {
  const { points, loading } = useUserPoint();

  const columns = [
    {
      title: "时间",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "变动值",
      dataIndex: "value",
      key: "value",
    },
    { title: "描述", dataIndex: "description", key: "description" },
  ];
  return (
    <>
      <PageHeader title="社区积分"></PageHeader>
      <Head>
        <title>社区积分 - SJTU选课社区</title>
      </Head>
      <Card>
        <Typography>
          <Title level={5}>概览</Title>
          <Skeleton loading={loading}>
            {points ? (
              <Descriptions bordered>
                <Descriptions.Item label="总积分" className="total-point">
                  {points.points}
                </Descriptions.Item>
              </Descriptions>
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </Skeleton>

          <Title level={5}>说明</Title>

          <Paragraph>
            您可以前往
            <a
              href="https://share.dyweb.sjtu.cn/"
              target="_blank"
              rel="noreferrer"
            >
              传承·交大
            </a>
            将选课社区积分兑换为传承积分。
          </Paragraph>
          <Title level={5}>积分详情</Title>
          <Skeleton loading={loading}>
            <Table
              tableLayout="fixed"
              dataSource={points?.details}
              columns={columns}
              pagination={false}
            ></Table>
          </Skeleton>
        </Typography>
      </Card>
    </>
  );
};
export default PointPage;
