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
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
