import ReviewList from '@/components/review-list';
import { Review } from '@/models';
import { getMyReivews } from '@/services/review';
import { useRequest } from 'ahooks';
import { Card, PageHeader } from 'antd';

const ActivityPage = () => {
  const { data: reviews, loading } = useRequest<Review[], []>(getMyReivews);

  return (
    <PageHeader
      title="我的点评"
      backIcon={false}
      subTitle={`共有${reviews ? reviews.length : 0}条点评`}
    >
      <Card>
        <ReviewList
          loading={loading}
          count={reviews?.length}
          reviews={reviews}
        />
      </Card>
    </PageHeader>
  );
};

export default ActivityPage;
