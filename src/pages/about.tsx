import AboutContent from '@/components/about-card';
import { Card, PageHeader } from 'antd';
import { history } from 'umi';
const About = () => {
  return (
    <PageHeader title="关于" onBack={() => history.goBack()}>
      <Card>
        <AboutContent />
      </Card>
    </PageHeader>
  );
};
export default About;
