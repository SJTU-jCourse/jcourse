import ReviewList from '@/components/review-list';
import { Review } from '@/models';
import { getMyReivews } from '@/services/review';
import { Card, PageHeader } from 'antd';
import { useEffect, useState } from 'react';

const ActivityPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchReviews = () => {
    setLoading(true);
    getMyReivews().then((reviews) => {
      setReviews(reviews);
      setLoading(false);
    });
  };

  useEffect(() => fetchReviews(), []);

  return (
    <PageHeader
      title="我的点评"
      backIcon={false}
      subTitle={'共有' + reviews.length + '个点评'}
    >
      <Card>
        <ReviewList
          loading={loading}
          count={reviews.length}
          reviews={reviews}
        />
      </Card>
    </PageHeader>
  );
};

export default ActivityPage;
