import ReportList from '@/components/report-list';
import ReportModal from '@/components/report-modal';
import { Report } from '@/models';
import { getReports } from '@/services/report';
import { useRequest } from 'ahooks';
import { Button, Card, PageHeader, Skeleton } from 'antd';
import { useState } from 'react';
import { history } from 'umi';

const ReportPage = () => {
  const { data: reports, loading, run } = useRequest<Report[], []>(getReports);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  return (
    <PageHeader title="我的反馈" onBack={() => history.goBack()}>
      <Card
        title={`共有${reports ? reports.length : 0}条反馈`}
        extra={
          <Button type="primary" onClick={() => setIsModalVisible(true)}>
            提交反馈
          </Button>
        }
      >
        <Skeleton loading={loading}>
          {reports && (
            <ReportList count={reports.length} reports={reports}></ReportList>
          )}
        </Skeleton>
      </Card>
      <ReportModal
        visible={isModalVisible}
        onOk={() => {
          setIsModalVisible(false);
          run();
        }}
        onCancel={() => setIsModalVisible(false)}
      />
    </PageHeader>
  );
};
export default ReportPage;
