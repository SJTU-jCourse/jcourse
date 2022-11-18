import { Card, Input, PageHeader, message } from "antd";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

import CourseList from "@/components/course-list";
import Config from "@/config/config";
import { Pagination } from "@/lib/models";
import { useSearchCourse } from "@/services/course";

const { Search } = Input;

const SearchPage = () => {
  const router = useRouter();
  const { page, size, q } = router.query;
  const show_q = q ? (q as string) : "";

  const pagination: Pagination = {
    page: page ? parseInt(page as string) : 1,
    pageSize: size ? parseInt(size as string) : Config.PAGE_SIZE,
  };
  const inputRef = useRef<any>(null);

  const { courses, loading, mutate } = useSearchCourse(q as string, pagination);

  useEffect(() => {
    inputRef.current?.focus({ cursor: "end" });
    if (show_q == "") return;
    mutate();
  }, []);

  const onSearch = (value: string) => {
    if (value.trim() == "") {
      message.info("请输入搜索内容");
      return;
    }
    router.push({ query: { q: value.trim() } });
  };

  const onPageChange = (page: number, pageSize: number) => {
    router.push({ query: { q, page, size: pageSize } });
  };

  return (
    <PageHeader title={"搜索"} onBack={() => history.back()}>
      <Head>
        <title>{"搜索 " + show_q + " - SJTU选课社区"}</title>
      </Head>
      <Search
        size="large"
        defaultValue={show_q}
        placeholder="搜索课程名/课号/教师姓名/教师姓名拼音"
        onSearch={onSearch}
        ref={inputRef}
        className="search-input"
      />
      <Card title={`共有${courses ? courses.count : 0}门课`}>
        <CourseList
          loading={loading}
          pagination={pagination}
          count={courses?.count}
          courses={courses?.results}
          onPageChange={onPageChange}
          showEnroll={true}
        />
      </Card>
    </PageHeader>
  );
};

export default SearchPage;
