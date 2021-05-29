import { PageHeader, Card } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CourseList from '@/components/course-list';
const Search = (props) => {
  const [q, setQ] = useState('');
  const [courses, setCourses] = useState({ count: 0, courses: [] });
  useEffect(() => {
    if (props.location.query && props.location.query.q) {
      setQ(props.location.query.q);
    }
  });
  useEffect(() => {
    axios.get(`/api/search?q=${q}`).then((resp) => {
      setCourses({
        count: resp.data.count,
        courses: resp.data.courses,
      });
    });
  }, [q]);
  return (
    <PageHeader
      title={`搜索 “${q}”`}
      onBack={() => history.back()}
      subTitle={'共有' + courses.count + '门课'}
    >
      <Card>
        <CourseList courses={courses.courses} />
      </Card>
    </PageHeader>
  );
};

export default Search;
