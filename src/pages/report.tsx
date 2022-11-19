import { Button, Card } from "antd";
import Head from "next/head";
import { useState } from "react";

import PageHeader from "@/components/page-header";
import ReportList from "@/components/report-list";
import ReportModal from "@/components/report-modal";
import { useReports } from "@/services/report";

const ReportPage = () => {
  const { reports, loading, mutate } = useReports();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <PageHeader title="我的反馈" onBack={() => history.back()} />
      <Head>
        <title>反馈 - SJTU选课社区</title>
      </Head>
      <Card
        title={`共有${reports ? reports.length : 0}条反馈`}
        extra={
          <Button type="primary" onClick={() => setIsModalOpen(true)}>
            提交反馈
          </Button>
        }
      >
        <ReportList
          loading={loading}
          count={reports?.length}
          reports={reports}
        ></ReportList>
      </Card>
      <ReportModal
        open={isModalOpen}
        onOk={() => {
          setIsModalOpen(false);
          mutate();
        }}
        onCancel={() => setIsModalOpen(false)}
      />
    </>
  );
};
export default ReportPage;
