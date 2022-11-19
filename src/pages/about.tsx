import { Card } from "antd";
import Head from "next/head";

import AboutCard from "@/components/about-card";
import PageHeader from "@/components/page-header";

const AboutPage = () => {
  return (
    <>
      <PageHeader title="关于" onBack={() => history.back()} />
      <Head>
        <title>关于 - SJTU选课社区</title>
      </Head>
      <Card>
        <AboutCard />
      </Card>
    </>
  );
};
export default AboutPage;
