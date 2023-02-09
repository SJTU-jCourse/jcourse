import { List } from "antd";

import ReviewItem from "@/components/review-item";
import { Pagination, Review } from "@/lib/models";

const ReviewList = ({
  loading,
  count,
  reviews,
  onPageChange,
  pagination,
  forceLockAll,
}: {
  loading: boolean;
  count: number | undefined;
  reviews: Review[] | undefined;
  onPageChange?: Function;
  pagination?: Pagination;
  forceLockAll?: boolean;
}) => {
  return (
    <List
      loading={loading}
      itemLayout="vertical"
      pagination={
        pagination
          ? {
              hideOnSinglePage: true,
              onChange: (page, pageSize) => {
                onPageChange && onPageChange(page, pageSize);
              },
              total: count,
              current: pagination.page,
              defaultCurrent: pagination.page,
              pageSize: pagination.pageSize,
            }
          : false
      }
      dataSource={reviews}
      renderItem={(item) => (
        <ReviewItem review={item} forceLocked={forceLockAll} />
      )}
    />
  );
};
export default ReviewList;
