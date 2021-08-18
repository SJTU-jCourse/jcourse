import ReviewList from '@/components/review-list';
import config from '@/config';
import { Pagination, PaginationApiResult, Review } from '@/models';
import { getReviews } from '@/services/review';
import { Card, PageHeader } from 'antd';
import { useEffect, useState } from 'react';

const Latest = () => {
  const [reviews, setReviews] = useState<PaginationApiResult<Review>>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    pageSize: config.PAGE_SIZE,
  });

  const fetchReviews = () => {
    const limit = pagination.pageSize;
    const offset = (pagination.page - 1) * pagination.pageSize;
    setLoading(true);
    getReviews(limit, offset).then((reviews) => {
      setReviews(reviews);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchReviews();
  }, [pagination]);

  const onPageChange = (page: number, pageSize: number) => {
    setPagination({ page, pageSize });
  };
  return (
    <PageHeader
      title="最新点评"
      backIcon={false}
      subTitle={'共有' + reviews.count + '个点评'}
    >
      <Card>
        <ReviewList
          loading={loading}
          count={reviews.count}
          reviews={reviews.results}
          onPageChange={onPageChange}
          pagination={pagination}
        />
      </Card>
    </PageHeader>
  );
};

export default Latest;
