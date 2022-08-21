import CourseList from "@/components/course-list";
import { authSync, useLessons, loginSync, syncLessons } from "@/services/sync";
import { Button, Card, Modal, PageHeader, Select, message } from "antd";
import { useEffect, useState } from "react";
import { useSemesters } from "@/services/semester";
import { useRouter } from "next/router";
import Head from "next/head";

const SyncPage = () => {
  const { avaiableSemesters } = useSemesters();
  const { courses, loading: courseLoading, mutate } = useLessons();
  const router = useRouter();
  const { code, state } = router.query;
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [semester, setSemester] = useState<string>("");
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  useEffect(() => {
    if (code && code != "") {
      authSync(code as string, state as string, router.basePath)
        .then(() => {
          message.info("已刷新 jAccount 登录状态，请继续同步！");
          router.replace({ pathname: "/sync" });
        })
        .catch(() => {
          message.error("参数错误！");
          router.replace({ pathname: "/sync" });
        });
    }
  }, [router.query]);

  const handleClick = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (semester == "") {
      message.error("请选择需要同步的学期！");
      return;
    }
    setConfirmLoading(true);

    syncLessons(semester)
      .then(() => {
        mutate();
        setIsModalVisible(false);
        setConfirmLoading(false);
      })
      .catch((err) => {
        if (err.response?.status == 401) {
          message.warning(
            "即将重新登录jAccount，请在本页面刷新后继续同步",
            () => {
              loginSync(router.basePath);
            }
          );
        } else if (err.response?.status == 403) {
          message.error("CSRF Failed: Origin checking failed");
          setConfirmLoading(false);
        }
      });
  };

  return (
    <PageHeader title="学过的课" backIcon={false}>
      <Head>
        <title>同步课表 - SJTU选课社区</title>
      </Head>
      <Card
        title={`共有${courses ? courses.length : 0}门课`}
        extra={
          <Button type="primary" onClick={() => handleClick()}>
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
        title="同步说明"
        visible={isModalVisible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={() => setIsModalVisible(false)}
      >
        选择需要同步的学期
        <Select
          placeholder="学期"
          className="sync-select"
          onSelect={(key: string) => setSemester(key)}
        >
          {avaiableSemesters?.map((semester) => (
            <Select.Option
              key={semester.name}
              value={semester.name}
              label={semester.name}
            >
              {semester.name}
            </Select.Option>
          ))}
        </Select>
        <p>
          2020-2021 代表 2020-2021 学年度（2020.9-2021.8）。
          <br />
          1代表秋季学期，2代表春季学期，3代表夏季学期/小学期。
        </p>
        <p>
          同步课表时可能需要重新登录jAccount。点击确定即代表您授权本网站通过jAccount接口查询并存储您的选课记录。
        </p>
        <p>
          部分课程不在选课社区数据库中，包括培养计划更改后取消的课程或者被替代的同名课程。这些课程将被忽略。
        </p>
      </Modal>
    </PageHeader>
  );
};

export default SyncPage;
