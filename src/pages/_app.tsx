import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { SWRConfig } from "swr";

import { BasicLayout, LoginLayout } from "@/components/layouts";
import "@/styles/global.css";

function MyApp({ Component, pageProps, router }: AppProps) {
  const isDark = useMediaQuery({
    query: "(prefers-color-scheme: dark)",
  });
  useEffect(() => {
    const darkcss = document.querySelector("#antd-dark-css");

    if (isDark) {
      if (darkcss) return;
      const css = document.createElement("link");
      css.rel = "stylesheet";
      css.type = "text/css";
      css.id = "antd-dark-css";
      css.href = "antd-dark.css";
      document.head.appendChild(css);
    } else {
      if (darkcss) document.head.removeChild(darkcss);
    }
  }, [isDark]);

  return (
    <SWRConfig value={{ shouldRetryOnError: false, revalidateOnFocus: false }}>
      <ConfigProvider locale={zhCN}>
        {router.pathname == "/login" ? (
          <LoginLayout>
            <Component {...pageProps} />
          </LoginLayout>
        ) : (
          <BasicLayout {...pageProps}>
            <Component {...pageProps} />
          </BasicLayout>
        )}
      </ConfigProvider>
    </SWRConfig>
  );
}

export default MyApp;
