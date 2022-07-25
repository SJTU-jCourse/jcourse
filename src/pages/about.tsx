import AboutCard from "@/components/about-card";
import { Card, PageHeader } from "antd";
import Head from "next/head";
const AboutPage = () => {
  return (
    <PageHeader title="关于" onBack={() => history.back()}>
      <Head>
        <title>关于 - SJTU选课社区</title>
      </Head>
      <Card>
        <AboutCard />
      </Card>
    </PageHeader>
  );
};
export default AboutPage;
