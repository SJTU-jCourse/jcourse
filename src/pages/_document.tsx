import { Head, Html, Main, NextScript } from "next/document";

import Config from "@/config/config";

export default function Document() {
  return (
    <Html lang="zh_CN">
      <Head>
        <link rel="shortcut icon" href="react.svg" />
        <script
          src={`https://hm.baidu.com/hm.js?${Config.BAIDU_TONGJI_CODE}`}
          async
        ></script>
        <meta
          name="description"
          content="SJTU选课社区，上海交大课程点评与经验分享"
        ></meta>
        <meta
          name="keywords"
          content="SJTU,选课社区,课程点评,上海交大,上海交通大学"
        ></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
