import { Result } from "antd";
import Head from "next/head";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <>
      <Head>
        <title>404 - SJTU选课社区</title>
      </Head>
      <Result
        status="404"
        title="哎呀抱歉，你要找的页面找不到了"
        subTitle={
          <span>
            如果这是网站的bug，或者要找的页面对你很重要，请通过
            <Link href="/report">反馈</Link>或者邮件
            <a href="mailto:course@sjtu.plus">course@sjtu.plus</a>联系我们
          </span>
        }
      />
    </>
  );
};
export default NotFoundPage;
