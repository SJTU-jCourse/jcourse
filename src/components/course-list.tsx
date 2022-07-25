import Config from "@/config/config";
import { CourseListItem, Pagination } from "@/lib/models";
import { List, Space, Tag, Typography } from "antd";
import Link from "next/link";
const { Text } = Typography;
const CourseList = ({
  loading,
  count,
  courses,
  onPageChange,
  pagination,
  showEnroll,
}: {
  loading: boolean;
  count: number | undefined;
  courses: CourseListItem[] | undefined;
  onPageChange?: Function;
  pagination?: Pagination;
  showEnroll?: boolean;
}) => {
  return (
    <List
      loading={loading}
      itemLayout="horizontal"
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
      dataSource={courses}
      renderItem={(course) => {
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
                    <a>
                      {course.code + " "}
                      {course.name}（{course.teacher}）
                    </a>
                  </Link>
                </Space>
              }
              description={
                <Space wrap size={0}>
                  {showEnroll && course.semester && (
                    <Tag color={Config.TAG_COLOR_ENROLL}>学过</Tag>
                  )}
                  {course.category && (
                    <Tag color={Config.TAG_COLOR_CATEGORY}>
                      {course.category}
                    </Tag>
                  )}
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
      }}
    />
  );
};
export default CourseList;
