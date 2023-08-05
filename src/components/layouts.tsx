import { Layout, Space } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import AnnouncementList from "@/components/announcement-list";
import NavBar from "@/components/navbar";
import { CommonInfoContext } from "@/lib/context";
import { useCommonInfo } from "@/services/common";

const { Header, Content, Footer } = Layout;

export const BasicLayout = ({ children }: React.PropsWithChildren<{}>) => {
  const [mounted, setMounted] = useState<boolean>(false);

  const { commonInfo, error } = useCommonInfo();
  const router = useRouter();
  useEffect(() => {
    if (error?.response?.status == 403 && mounted) {
      const pathname = window.location.pathname;
      router.replace({ pathname: "/login", query: { next: pathname } });
    }
  }, [error]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  return (
    <CommonInfoContext.Provider value={commonInfo}>
      <Layout className="basic-layout">
        <Header className="header">
          <NavBar user={commonInfo?.user} />
        </Header>

        <Content
          className="content"
          style={{ paddingInline: 16, paddingLeft: 16, paddingRight: 16 }}
        >
          {commonInfo?.announcements && commonInfo.announcements.length > 0 && (
            <AnnouncementList announcements={commonInfo.announcements} />
          )}
          {children}
        </Content>
        <Footer className="footer">
          <Space>
            <Link href="/about">关于</Link>
            <Link href="/faq">常见问题</Link>
            <Link href="/report">反馈</Link>
          </Space>
          <div>©2023 SJTU选课社区</div>
        </Footer>
      </Layout>
    </CommonInfoContext.Provider>
  );
};

export const LoginLayout = ({ children }: React.PropsWithChildren<{}>) => (
  <Layout className="login-layout">
    <Header className="header">
      <div className="title">SJTU选课社区</div>
    </Header>
    <Content className="content">{children}</Content>
  </Layout>
);
