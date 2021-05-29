import {
  PageHeader,
  Card,
} from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ReviewList from '@/components/review-list';
const Latest = () => {
  const [reviews, setReviews] = useState({ count: 0, reviews: [] });

  useEffect(() => {
    axios.get('/api/reviews').then((resp) => {
      setReviews(resp.data);
    });
  }, []);

  return (
    <>
      <PageHeader
        title="最新点评"
        backIcon={false}
        subTitle={'共有' + reviews.count + '个点评'}
      ></PageHeader>
      <Card>
        <ReviewList reviews={reviews.reviews} />
      </Card>
    </>
  );
};

export default Latest;
