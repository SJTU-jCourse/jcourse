import ReviewList from '@/components/review-list';
import config from '@/config';
import { Pagination, PaginationApiResult, Review } from '@/models';
import { getReviews } from '@/services/review';
import { Card, PageHeader } from 'antd';
import { useEffect, useState } from 'react';
import { history } from 'umi';
const LatestPage = () => {
  const queryString = require('query-string');
  const parsed = queryString.parse(location.search);

  const [reviews, setReviews] = useState<PaginationApiResult<Review>>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const pagination: Pagination = {
    page: parsed.page ? parseInt(parsed.page) : 1,
    pageSize: parsed.size ? parseInt(parsed.size) : config.PAGE_SIZE,
  };

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
  }, [history.location.query]);

  const onPageChange = (page: number, pageSize: number) => {
    history.push({
      pathname: history.location.pathname,
      query: { page: page.toString(), size: pageSize.toString() },
    });
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
