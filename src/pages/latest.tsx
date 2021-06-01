import ReviewList from '@/components/review-list';
import { PaginationApiResult, Review } from '@/models';
import { Card, PageHeader } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Latest = () => {
  const [reviews, setReviews] = useState<PaginationApiResult<Review>>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });

  useEffect(() => {
    axios.get('/api/review/').then((resp) => {
      setReviews(resp.data);
    });
  }, []);

  return (
    <PageHeader
      title="最新点评"
      backIcon={false}
      subTitle={'共有' + reviews.count + '个点评'}
    >
      <Card>
        <ReviewList reviews={reviews.results} />
      </Card>
    </PageHeader>
  );
};

export default Latest;
