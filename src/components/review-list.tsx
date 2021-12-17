import ReviewActionButton from '@/components/review-action-button';
import { Pagination, Review } from '@/models';
import { doReviewAction } from '@/services/review';
import { Alert, List, Space } from 'antd';
import { Link, useModel } from 'umi';
const ReviewList = ({
  count,
  reviews,
  onPageChange,
  loading,
  pagination,
}: {
  count: number;
  reviews: Review[];
  onPageChange?: Function;
  loading: boolean;
  pagination?: Pagination;
}) => {
  const { initialState } = useModel('@@initialState');
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
          actions={[
            <div>{item.created}</div>,
            <ReviewActionButton
              onAction={doReviewAction}
              actionProps={{
                id: item.id,
                ...item.actions,
              }}
            />,
          ]}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
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
                  <strong>学期：</strong>
                  {initialState?.semesterMap.get(item.semester)}
                </span>
              )}
              {item.score && (
                <span>
                  <strong>成绩：</strong>
                  {item.score}
                </span>
              )}
            </Space>
            <div style={{ whiteSpace: 'pre-wrap' }}>{item.comment}</div>
            {item.is_mine && <Link to={`/review/${item.id}/`}>修改点评</Link>}
          </Space>
        </List.Item>
      )}
    />
  );
};
export default ReviewList;
