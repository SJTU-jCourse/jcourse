import {
  Button,
  Card,
  Col,
  Collapse,
  Grid,
  Input,
  Modal,
  Row,
  Table,
  message,
} from "antd";
import type { CollapseProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import Head from "next/head";
import { useState } from "react";

import CourseList from "@/components/course-list";
import PageHeader from "@/components/page-header";
import { SyncCourseItem } from "@/lib/models";
import { syncLessons, useLessons } from "@/services/sync";

const SyncCourseTableColumns: ColumnsType<SyncCourseItem> = [
  { title: "课号", dataIndex: "code" },
  { title: "课名", dataIndex: "name" },
  { title: "教师", dataIndex: "teachers" },
  { title: "学期", dataIndex: "semester" },
];

const CollapseItems: CollapseProps["items"] = [
  {
    key: "1",
    label: "同步课表教程",
    children: (
      <>
        <p>
          1. 登录教学信息服务网{" "}
          <a target="_blank" href="https://i.sjtu.edu.cn/">
            https://i.sjtu.edu.cn/
          </a>
        </p>
        <p>
          2. 进入 <b>信息查询 - 学生课表查询</b>
          ，选择需要同步的学期，切换显示样式为 <b>列表</b>
        </p>
        <p>
          3. 点击 <b>查询</b>，复制课表，粘贴到本窗口下方编辑框中
        </p>
        <p>
          4. 点击右下方 <b>同步</b> 即可
        </p>
      </>
    ),
  },
];

const parseCourses = (raw: string): SyncCourseItem[] => {
  const courseNameReg =
    /\n(\S+)[◇●○★▲☆]\s+周数：\S+\s+校区：\S+\s+上课地点：\S+\s+教师：(\S+)\s+教学班：\((\S+)\)\-(\S+)-\S+\s+/g;
  const matches = raw.matchAll(courseNameReg);
  const courses: SyncCourseItem[] = Array.from(matches, (item) => {
    return {
      name: item[1],
      teachers: item[2],
      semester: item[3],
      code: item[4],
    };
  });

  const map = new Map();

  return courses.filter((item) => !map.has(item.code) && map.set(item.code, 1)); // 去重
};

const SyncPage = () => {
  const screens = Grid.useBreakpoint();

  const { courses, loading: courseLoading, mutate } = useLessons();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [syncCourseItems, setSyncCourseItems] = useState<SyncCourseItem[]>([]);

  const syncCourses = () => {
    if (syncCourseItems.length == 0) {
      message.warning("同步前请至少提交一条课表记录");
      return;
    }
    syncLessons(syncCourseItems)
      .then(() => {
        setSyncCourseItems([]);
        setIsModalOpen(false);
        mutate();
      })
      .catch((resp) => {
        message.error(resp);
      });
  };

  const onCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <PageHeader title="学过的课"></PageHeader>
      <Head>
        <title>同步课表 - SJTU选课社区</title>
      </Head>
      <Card
        title={`共有${courses ? courses.length : 0}门课`}
        extra={
          <Button type="primary" onClick={() => setIsModalOpen(true)}>
            同步
          </Button>
        }
      >
        <CourseList
          loading={courseLoading}
          count={courses?.length}
          courses={courses}
          showEnroll={false}
        />
      </Card>
      <Modal
        title="同步课表"
        open={isModalOpen}
        okText="同步"
        onOk={syncCourses}
        onCancel={onCancel}
        width={screens.md ? "80%" : 520}
      >
        <Collapse size="small" ghost items={CollapseItems} />
        <Row gutter={16}>
          <Col span={screens.sm ? 12 : 24}>
            <Input.TextArea
              placeholder="在此处粘贴教学信息服务网上的课表（列表显示）"
              onChange={(e) => {
                setSyncCourseItems(parseCourses(e.target.value));
              }}
              autoSize={{ minRows: 10, maxRows: 20 }}
            ></Input.TextArea>
          </Col>
          <Col span={screens.sm ? 12 : 24}>
            <Table
              size="small"
              columns={SyncCourseTableColumns}
              dataSource={syncCourseItems}
              pagination={false}
              rowKey="code"
            ></Table>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default SyncPage;
