import CourseList from '@/components/course-list';
import { CourseListItem, Semester } from '@/models';
import { getSemesters } from '@/services/semester';
import { getLessons, loginSync, syncLessons } from '@/services/sync';
import { Button, Card, Modal, PageHeader, Select, message } from 'antd';
import { useEffect, useState } from 'react';

interface SelectItem {
  label: string;
  value: string;
}

const Sync = () => {
  const [courses, setCourses] = useState<CourseListItem[]>([]);
  const [courseLoading, setCourseLoading] = useState<boolean>(false);
  const [semesterLoading, setSemesterLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [semesters, setSemesters] = useState<SelectItem[]>([]);
  const [semester, setSemester] = useState<string>('');
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const fetchCourses = () => {
    setCourseLoading(true);
    getLessons().then((courses) => {
      setCourses(courses);
      setCourseLoading(false);
    });
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchSemester = () => {
    getSemesters().then((semesters) => {
      setSemesters(
        semesters.map((item: Semester) => {
          return { label: item.name, value: item.name };
        }),
      );
      setSemesterLoading(false);
    });
  };

  const handleClick = () => {
    if (semesterLoading) {
      fetchSemester();
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setCourseLoading(true);
    syncLessons(semester)
      .then((courses) => {
        setCourses(courses);
        setIsModalVisible(false);
      })
      .catch((err) => {
        if (err.response?.status == 401) {
          message.warning(
            '即将重新登录jAccount，请在本页面刷新后继续同步',
            () => {
              loginSync();
            },
          );
        }
      })
      .finally(() => {
        setCourseLoading(false);
        setConfirmLoading(false);
      });
  };

  return (
    <PageHeader title="上过的课" backIcon={false}>
      <Card
        title={'共有' + courses.length + '门课'}
        extra={
          <Button type="primary" onClick={() => handleClick()}>
            同步
          </Button>
        }
      >
        <CourseList
          loading={courseLoading}
          count={courses.length}
          courses={courses}
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
          style={{ width: '100%' }}
          onSelect={(key) => setSemester(key as string)}
          options={semesters}
        ></Select>
        <p>
          2020-2021 代表 2020-2021 学年度（2020.9-2021.8）。
          <br />
          1代表秋季学期，2代表春季学期，3代表夏季学期/小学期。
        </p>
        <p>
          部分课程不在选课社区数据库中，这些课程将被忽略。同步课表时可能需要重新登录jAccount。点击确认即代表您授权本网站通过jAccount接口查询并存储您的选课记录
        </p>
      </Modal>
    </PageHeader>
  );
};

export default Sync;
