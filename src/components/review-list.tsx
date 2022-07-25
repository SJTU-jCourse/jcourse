import { Pagination, Review } from "@/lib/models";
import { List } from "antd";
import ReviewItem from "./review-item";
const ReviewList = ({
  loading,
  count,
  reviews,
  onPageChange,
  pagination,
}: {
  loading: boolean;
  count: number | undefined;
  reviews: Review[] | undefined;
  onPageChange?: Function;
  pagination?: Pagination;
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
      renderItem={(item) => <ReviewItem review={item} />}
    />
  );
};
export default ReviewList;
