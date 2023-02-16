import { Layout, Space } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import AnnouncementList from "@/components/announcement-list";
import NavBar from "@/components/navbar";
import { UserContext } from "@/lib/context";
import { useAnnouncements } from "@/services/announcement";
import { useUser } from "@/services/user";

const { Header, Content, Footer } = Layout;

export const BasicLayout = ({ children }: React.PropsWithChildren<{}>) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { announcements } = useAnnouncements();
  const { user, error } = useUser();
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
    <Layout className="basic-layout">
      <Header className="header">
        <NavBar user={user} />
      </Header>

      <Content
        className="content"
        style={{ paddingInline: 16, paddingLeft: 16, paddingRight: 16 }}
      >
        {announcements && announcements.length > 0 && (
          <AnnouncementList announcements={announcements} />
        )}
        <UserContext.Provider value={user}>{children}</UserContext.Provider>
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
