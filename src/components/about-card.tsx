import { Typography } from "antd";

import ContactEmail from "@/components/contact-email";

const { Paragraph, Title } = Typography;

const AboutCard = () => {
  return (
    <Typography>
      <Title level={4} style={{ marginTop: 0 }}>
        简介
      </Title>
      <Paragraph>
        SJTU选课社区为非官方网站。选课社区目的在于让同学们了解课程的更多情况，不想也不能代替教务处的课程评教。
      </Paragraph>
      <Title level={4}>机制</Title>
      <Title level={5}>匿名身份</Title>
      <Paragraph>
        选课社区采用 jAccount 或者邮箱登录并作为身份标识。本站不明文存储您的
        jAccount 用户名，仅在数据库中存放其哈希值。
        <br />
        选课社区前台不显示每条点评的用户名，也不显示不同点评之间的用户关联。
      </Paragraph>
      <Title level={5}>点评管理</Title>
      <Paragraph>
        在符合社区规范的情况下，我们不修改选课社区的点评内容，也不评价内容的真实性。
        如果您上过某一门课程并认为网站上的点评与事实不符，欢迎提交您的意见，
        我们相信全面的信息会给大家最好的答案。
        <br />
        选课社区管理员的责任仅限于维护系统的稳定，删除非课程点评内容和重复发帖，并维护课程和教师信息格式，
        方便进行数据的批量处理。
      </Paragraph>
      <Title level={4}>隐私</Title>
      <Paragraph>
        当您访问选课社区时，我们使用百度统计收集您的访问信息，便于统计用户使用情况。
        <br />
        当您登录选课社区时，我们会收集您的身份类型（在校生、教职工、校友等），但不收集除此以外的其他信息。
        <br />
        选课社区部分功能可能需要使用 jAccount
        接口获取并存储选课等信息，我们将在您使用此类功能前予以提示。
      </Paragraph>
      <Title level={4}>联系方式</Title>
      <Paragraph>
        您可以通过邮件
        <ContactEmail />
        联系我们。
      </Paragraph>
    </Typography>
  );
};

export default AboutCard;
