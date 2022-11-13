import { CourseDetail, NotificationLevel, Teacher } from "@/lib/models";
import {
  Card,
  Descriptions,
  Typography,
  Select,
  Space,
  Button,
  message,
} from "antd";
import { PropsWithChildren, useState } from "react";

import ReportModal from "@/components/report-modal";
import { changeCourseNotificationLevel } from "@/services/course";

const { Text } = Typography;

const NotificationLevelSelect = ({ course }: { course: CourseDetail }) => {
  const onNotificationLevelChange = (value: NotificationLevel) => {
    changeCourseNotificationLevel(course.id, value).catch((error) => {
      message.error(error.response?.data);
    });
  };

  const options = [
    { value: NotificationLevel.NORMAL, label: "正常" },
    { value: NotificationLevel.FOLLOW, label: "关注" },
    { value: NotificationLevel.IGNORE, label: "忽略" },
  ];
  return (
    <Space>
      通知级别
      <Select
        defaultValue={course.notification_level || NotificationLevel.NORMAL}
        options={options}
        bordered={false}
        onChange={onNotificationLevelChange}
      ></Select>
    </Space>
  );
};

const CourseDetailCard = ({
  course,
  loading,
  semesterMap,
}: PropsWithChildren<{
  course?: CourseDetail;
  loading?: boolean;
  semesterMap?: Map<number, string>;
}>) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <Card
      title="课程信息"
      loading={loading}
      actions={[
        <Button type="link" onClick={() => setIsModalOpen(true)}>
          信息有误？
        </Button>,
        course && (
          <NotificationLevelSelect course={course}></NotificationLevelSelect>
        ),
      ]}
    >
      {course && (
        <>
          <Descriptions column={1}>
            <Descriptions.Item label="课号">{course.code}</Descriptions.Item>
            {course.former_codes.length > 0 && (
              <Descriptions.Item label="曾用课号">
                {course.former_codes.join("，")}
              </Descriptions.Item>
            )}
            <Descriptions.Item label="课程学分">
              {course.credit}
            </Descriptions.Item>
            <Descriptions.Item label="开课单位">
              {course.department}
            </Descriptions.Item>
            {course.teacher_group.length > 1 && (
              <Descriptions.Item label="合上教师">
                {course.teacher_group
                  .map((item: Teacher) => {
                    return item.name;
                  })
                  .join("，")}
              </Descriptions.Item>
            )}
            {course.categories?.length > 0 && (
              <Descriptions.Item label="课程类别">
                {course.categories.join("，")}
              </Descriptions.Item>
            )}
            {course.moderator_remark && (
              <Descriptions.Item label="备注">
                {course.moderator_remark}
              </Descriptions.Item>
            )}
            {course.semester && semesterMap && (
              <Descriptions.Item label="学过学期">
                {semesterMap.get(course.semester)}
              </Descriptions.Item>
            )}
            {course.rating.count > 0 && (
              <Descriptions.Item label="推荐指数">
                <Text strong>{course.rating.avg?.toFixed(1)}</Text>
                <Text>（{course.rating.count}人评价）</Text>
              </Descriptions.Item>
            )}
          </Descriptions>
          <ReportModal
            open={isModalOpen}
            title={"课程信息反馈"}
            defaultComment={`课程：${course.code} ${course.name} ${course.main_teacher.name}\n内部编号：${course.id}\n更改意见：`}
            onOk={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
          />
        </>
      )}
    </Card>
  );
};

export default CourseDetailCard;
