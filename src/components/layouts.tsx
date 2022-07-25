import NoticeList from "@/components/notice-list";
import { useNotices } from "@/services/notice";
import { Layout, Space } from "antd";

import React from "react";
import Link from "next/link";
import NavBar from "@/components/navbar";

const { Header, Content, Footer } = Layout;

export const BasicLayout = ({ children }: React.PropsWithChildren<{}>) => {
  const { notices } = useNotices();

  return (
    <Layout className="basic-layout">
      <Header className="header">
        <NavBar />
      </Header>

      <Content className="content">
        {notices && notices.length > 0 && <NoticeList notices={notices} />}
        {children}
      </Content>
      <Footer className="footer">
        <Space>
          <Link href="/about">
            <a>关于</a>
          </Link>
          <Link href="/faq">
            <a>常见问题</a>
          </Link>
          <Link href="/report">
            <a>反馈</a>
          </Link>
        </Space>
        <div>©2022 SJTU选课社区</div>
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
