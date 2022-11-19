import { ConfigProvider, theme } from "antd";
import zhCN from "antd/locale/zh_CN";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { SWRConfig } from "swr";

import { BasicLayout, LoginLayout } from "@/components/layouts";
import "@/styles/global.css";

function MyApp({ Component, pageProps, router }: AppProps) {
  const [mounted, setMounted] = useState<boolean>(false);

  const isDark = useMediaQuery({
    query: "(prefers-color-scheme: dark)",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <SWRConfig value={{ shouldRetryOnError: false, revalidateOnFocus: false }}>
      <ConfigProvider
        locale={zhCN}
        theme={{
          algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: { colorPrimary: "#1DA57A", colorInfo: "#1DA57A" },
        }}
      >
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
