import ReportList from '@/components/report-list';
import ReportModal from '@/components/report-modal';
import { Report } from '@/models';
import { getReports } from '@/services/report';
import { Button, Card, PageHeader } from 'antd';
import { useEffect, useState } from 'react';
import { history } from 'umi';

const ReportPage = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [reportsLoading, setReportsLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const fetchReports = () => {
    setReportsLoading(true);
    getReports().then((reports) => {
      setReports(reports);
      setReportsLoading(false);
    });
  };

  useEffect(() => {
    fetchReports();
  }, []);
  return (
    <PageHeader title="我的反馈" onBack={() => history.goBack()}>
      <Card
        title={'共有' + reports.length + '条反馈'}
        extra={
          <Button type="primary" onClick={() => setIsModalVisible(true)}>
            提交反馈
          </Button>
        }
      >
        <ReportList
          loading={reportsLoading}
          count={reports.length}
          reports={reports}
        ></ReportList>
      </Card>
      <ReportModal
        visible={isModalVisible}
        onOk={() => {
          setIsModalVisible(false);
          fetchReports();
        }}
        onCancel={() => setIsModalVisible(false)}
      />
    </PageHeader>
  );
};
export default ReportPage;
