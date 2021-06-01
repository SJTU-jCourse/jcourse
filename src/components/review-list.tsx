import { LeftIconText } from '@/components/icon-text';
import config from '@/config';
import { Review } from '@/models';
import { DislikeOutlined, LikeOutlined } from '@ant-design/icons';
import { Alert, List, Space } from 'antd';
import { Link } from 'umi';
const ReviewList = ({ reviews }: { reviews: Review[] }) => {
  return (
    <List
      itemLayout="vertical"
      pagination={
        reviews && reviews.length > config.PAGE_SIZE
          ? {
              onChange: (page) => {
                console.log(page);
              },
              pageSize: config.PAGE_SIZE,
            }
          : false
      }
      dataSource={reviews}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          actions={[
            <div>{item.created}</div>,
            <LeftIconText
              icon={LikeOutlined}
              text={item.approves}
              key="list-vertical-like-o"
            />,
            <LeftIconText
              icon={DislikeOutlined}
              text={item.disapproves}
              key="list-vertical-dislike-o"
            />,
          ]}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            {item.moderator_remark && (
              <Alert message={item.moderator_remark} type="warning" showIcon />
            )}

            {item.course && (
              <Link to={'/course/' + item.course.id}>
                {item.course.code} {item.course.name}（{item.course.teacher}）
              </Link>
            )}

            <div>
              <strong>推荐指数：</strong>
              {item.rating} <strong> 学期：</strong>
              {item.semester}
              {item.score && (
                <>
                  <strong> 成绩：</strong>
                  {item.score}
                </>
              )}
            </div>
            <div>{item.comment}</div>
          </Space>
        </List.Item>
      )}
    />
  );
};
export default ReviewList;
