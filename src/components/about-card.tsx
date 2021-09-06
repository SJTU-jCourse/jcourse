import { Typography } from 'antd';
const { Paragraph } = Typography;

const AboutContent = () => {
  return (
    <>
      <Paragraph>
        SJTU选课社区为非官方网站，与上海交通大学官方机构没有关联，包括 SJTU-Plus
        与交大传承。
      </Paragraph>
      <Paragraph>
        秉承着完全信息原则，我们不对网站上的课程点评进行修改，
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
    </>
  );
};

export default AboutContent;
