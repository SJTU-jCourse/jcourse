import ReviewList from '@/components/review-list';
import config from '@/config';
import { Pagination, PaginationApiResult, Review } from '@/models';
import { getReviews } from '@/services/review';
import useUrlState from '@ahooksjs/use-url-state';
import { useRequest } from 'ahooks';
import { Card, PageHeader } from 'antd';
const LatestPage = () => {
  const [urlState, setUrlState] = useUrlState({
    page: 1,
    size: config.PAGE_SIZE,
  });
  const pagination: Pagination = {
    page: parseInt(urlState.page),
    pageSize: parseInt(urlState.size),
  };

  const { data: reviews, loading } = useRequest<
    PaginationApiResult<Review>,
    []
  >(() => getReviews(pagination), { refreshDeps: [urlState] });

  const onPageChange = (page: number, pageSize: number) => {
    setUrlState({ page: page, size: pageSize });
  };

  return (
    <PageHeader
      title="最新点评"
      backIcon={false}
      subTitle={`共有${reviews ? reviews.count : 0}个点评`}
    >
      <Card>
        <ReviewList
          loading={loading}
          count={reviews?.count}
          reviews={reviews?.results}
          onPageChange={onPageChange}
          pagination={pagination}
        />
      </Card>
    </PageHeader>
  );
};

export default LatestPage;
