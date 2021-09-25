import { Typography } from 'antd';
const { Paragraph } = Typography;

const AboutContent = () => {
  return (
    <>
      <Paragraph>
        SJTU选课社区为非官方网站，与上海交通大学官方机构没有关联。
      </Paragraph>
      <Paragraph>
        秉承着完全信息原则，我们不修改网站上的课程点评内容，也不评价内容的真实性。
        如果你上过某一门课程并认为网站上的点评与事实不符，欢迎提交你的意见，
        我们相信全面的信息会给大家最好的答案。
      </Paragraph>
      <Paragraph>
        运营者的责任仅限于维护系统的稳定、删除垃圾发帖，并维护课程和教师信息格式，
        方便进行数据的批量处理。
      </Paragraph>
      <Paragraph>
        即便如此，
        我们希望所有参与者共同维护平台内容的合理性和平台本身存在的初衷。
        尊重他人不意味着一边倒，但也不意味着没有底线和侵犯他人应有的权利。
      </Paragraph>
    </>
  );
};

export default AboutContent;
