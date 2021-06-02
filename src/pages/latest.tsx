import ReviewList from '@/components/review-list';
import config from '@/config';
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

  const fetchReviews = (limit: number, offset: number) => {
    axios.get(`/api/review/?limit=${limit}&offset=${offset}`).then((resp) => {
      setReviews(resp.data);
    });
  };

  useEffect(() => {
    fetchReviews(config.PAGE_SIZE, 0);
  }, []);

  const onPageChange = (page: number, pageSize: number) => {
    fetchReviews(pageSize, (page - 1) * pageSize);
  };
  return (
    <PageHeader
      title="最新点评"
      backIcon={false}
      subTitle={'共有' + reviews.count + '个点评'}
    >
      <Card>
        <ReviewList
          count={reviews.count}
          reviews={reviews.results}
          onPageChange={onPageChange}
        />
      </Card>
    </PageHeader>
  );
};

export default Latest;
