import { CourseListItem, Pagination } from "@/lib/models";
import { List } from "antd";
import CourseItem from "./course-item";

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
      renderItem={(course) => (
        <CourseItem course={course} showEnroll={showEnroll}></CourseItem>
      )}
    />
  );
};
export default CourseList;
