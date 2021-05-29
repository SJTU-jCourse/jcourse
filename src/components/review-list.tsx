import { Space, List } from 'antd';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import { LeftIconText } from '@/components/icon-text';
import { Review } from '@/models/review';
import { Link } from 'react-router-dom';
const ReviewList = ({ reviews }: { reviews: Review[] }) => {
  return (
    <List
      itemLayout="vertical"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 10,
      }}
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
          <Space direction="vertical">
            {item.course ? (
              <Link to={'/course/' + item.course.id}>
                {item.course.code} {item.course.name}（{item.course.teacher}）
              </Link>
            ) : (
              <></>
            )}

            <div>
              <strong>推荐指数：</strong>
              {item.rating} <strong> 学期：</strong>
              {item.semester}
              {item.score ? (
                <>
                  <strong> 成绩：</strong>
                  {item.score}
                </>
              ) : (
                <></>
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
