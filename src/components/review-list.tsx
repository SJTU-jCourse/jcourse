import { Rate, Space, List } from 'antd';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import IconText from '@/components/icon-text';
import { ReviewInCourse } from '@/models/review';

const ReviewList = ({ reviews }: { reviews: ReviewInCourse[] }) => {
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
            <IconText
              icon={LikeOutlined}
              text={item.approves}
              key="list-vertical-like-o"
            />,
            <IconText
              icon={DislikeOutlined}
              text={item.disapproves}
              key="list-vertical-dislike-o"
            />,
          ]}
        >
          <Space direction="vertical">
            <div>{item.comment}</div>
            <Space align="center">
              <span>{item.semester}学期</span>

              <Rate disabled value={item.rating} />
            </Space>
          </Space>
        </List.Item>
      )}
    />
  );
};
export default ReviewList;
