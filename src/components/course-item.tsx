import Config from "@/config/config";
import { CourseListItem } from "@/lib/models";
import { List, Space, Tag, Typography } from "antd";
import Link from "next/link";
const { Text } = Typography;

const CourseItem = ({
  course,
  showEnroll,
}: {
  course: CourseListItem;
  showEnroll?: boolean;
}) => {
  return (
    <List.Item
      key={course.id}
      extra={
        course.rating.count > 0 ? (
          <Space size="small" direction="vertical" align="center">
            <Text strong>{course.rating.avg.toFixed(1)}</Text>
            <Text type="secondary">{course.rating.count}人评价</Text>
          </Space>
        ) : (
          <Text type="secondary">暂无点评</Text>
        )
      }
    >
      <List.Item.Meta
        title={
          <Space align="center">
            <Link href={"/course/" + course.id}>
              {course.code + " "}
              {course.name}（{course.teacher}）
            </Link>
          </Space>
        }
        description={
          <Space wrap size={0}>
            {showEnroll && course.semester && (
              <Tag color={Config.TAG_COLOR_ENROLL}>学过</Tag>
            )}
            {course.categories &&
              course.categories.map((tag: string) => (
                <Tag key={tag} color={Config.TAG_COLOR_CATEGORY}>
                  {tag}
                </Tag>
              ))}
            {course.is_reviewed && (
              <Tag color={Config.TAG_COLOR_REVIEW}>已点评</Tag>
            )}
            <div>
              {course.credit}学分 {course.department}
            </div>
          </Space>
        }
      />
    </List.Item>
  );
};

export default CourseItem;
