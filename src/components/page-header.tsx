import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Col, Row, Space, Typography } from "antd";

const { Text } = Typography;
const PageHeader = ({
  title,
  subTitle,
  onBack,
  extra,
}: {
  title: string | JSX.Element;
  subTitle?: string;
  onBack?: () => void;
  extra?: JSX.Element;
}) => {
  return (
    <Row
      style={{ marginTop: 16, marginBottom: 16, alignItems: "center" }}
      gutter={16}
    >
      {onBack && (
        <Col>
          <Button
            type="text"
            shape="circle"
            onClick={onBack}
            icon={<ArrowLeftOutlined />}
          ></Button>
        </Col>
      )}
      {title && (
        <Col>
          <Text style={{ fontSize: "20px", fontWeight: 600 }}>{title}</Text>
        </Col>
      )}
      {subTitle && (
        <Col flex="auto">
          <Text type="secondary">{subTitle}</Text>
        </Col>
      )}
      {extra && <Col>{extra}</Col>}
    </Row>
  );
};

export default PageHeader;
