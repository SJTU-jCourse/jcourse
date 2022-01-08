import ReviewList from '@/components/review-list';
import config from '@/config';
import { Pagination, PaginationApiResult, Review } from '@/models';
import { getReviews } from '@/services/review';
import useUrlState from '@ahooksjs/use-url-state';
import { Card, PageHeader } from 'antd';
import { useEffect, useState } from 'react';
const LatestPage = () => {
  const [urlState, setUrlState] = useUrlState({
    page: 1,
    size: config.PAGE_SIZE,
  });
  const pagination: Pagination = {
    page: parseInt(urlState.page),
    pageSize: parseInt(urlState.size),
  };
  const [reviews, setReviews] = useState<PaginationApiResult<Review>>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [loading, setLoading] = useState<boolean>(false);

  const fetchReviews = () => {
    setLoading(true);
    getReviews(pagination).then((reviews) => {
      setReviews(reviews);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchReviews();
  }, [urlState]);

  const onPageChange = (page: number, pageSize: number) => {
    setUrlState({ page: page, size: pageSize });
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

export default LatestPage;
