import ReviewActionButton from '@/components/review-action-button';
import { Pagination, Review } from '@/models';
import { doReviewAction } from '@/services/review';
import { Alert, List, Space, Tooltip } from 'antd';
import { Link } from 'umi';
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
      renderItem={(item) => (
        <List.Item
          key={item.id}
          className={'review-item'}
          actions={[
            <Tooltip
              title={item.modified ? '编辑于' + item.modified : undefined}
            >
              <div>{item.created}</div>
            </Tooltip>,
            <ReviewActionButton
              onAction={doReviewAction}
              actionProps={{
                id: item.id,
                ...item.actions,
              }}
            />,
            <>{'#' + item.id}</>,
          ]}
        >
          <Space direction="vertical" className="review-body">
            {item.moderator_remark && (
              <Alert message={item.moderator_remark} type="warning" showIcon />
            )}

            {item.course && (
              <Space wrap>
                <Link to={'/course/' + item.course.id}>
                  {item.course.code} {item.course.name}（{item.course.teacher}）
                </Link>
              </Space>
            )}
            <Space wrap>
              <span>
                <strong>推荐指数：</strong>
                {item.rating}
              </span>
              {item.semester && (
                <span>
                  <>
                    <strong>学期：</strong>
                    {item.semester}
                  </>
                </span>
              )}
              {item.score && (
                <span>
                  <strong>成绩：</strong>
                  {item.score}
                </span>
              )}
            </Space>
            <div className="comment">{item.comment}</div>
            {item.is_mine && <Link to={`/review/${item.id}/`}>修改点评</Link>}
          </Space>
        </List.Item>
      )}
    />
  );
};
export default ReviewList;
