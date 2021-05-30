import { Card, Typography } from 'antd';
import { Link } from 'umi';
const { Title, Paragraph } = Typography;
const About = () => {
  return (
    <Card title="关于">
      <Title level={3}>联系我们</Title>
      <Paragraph>
        请通过<Link to="/report">这个链接</Link>
        向平台提出意见和建议，如果希望得到私下的回复，请留下你的联系方式。
      </Paragraph>
      <Paragraph>
        如果您是老师希望对课程的点评进行答复或澄清，也欢迎您联系我们。
      </Paragraph>
      <Title level={3}>我们的态度</Title>
      <Paragraph>
        本课程点评网站为非官方网站，与上海交通大学官方机构没有关联，包括
        SJTU-Plus 与上述合作运营人。
      </Paragraph>
      <Paragraph>
        秉承着完全信息原则，我们不对网站上的课程点评进行审核、修改，
        也不对内容的真实性进行评价。
        如果你上过某一门课程并认为网站上的点评与事实不符，欢迎你提交你的意见，
        我们相信全面的信息会给大家最好的答案。我们希望这个小站保持一定的“野生”
        性，以排除外界诸多因素的干扰。
      </Paragraph>
      <Paragraph>
        运营者的责任仅限于维护系统的稳定、删除垃圾发帖
        （类似于系统bug重复发送、无效的课程信息等，
        与内容是否中肯无关）、并维护点评的课程和教师信息格式（例如拼写错误等）
        方便进行数据的批量处理。
      </Paragraph>
      <Paragraph>
        即便如此，
        我们希望所有参与者共同维护这个平台内容的合理性和平台本身存在的初衷。
        尊重他人不意味着一边倒，但也不意味着没有底线和侵犯他人应有的权利。
      </Paragraph>

      <Paragraph>
        本网站是匿名制的，不主动索取与记录提交者的个人信息，只进行访问统计。
      </Paragraph>
    </Card>
  );
};
export default About;
