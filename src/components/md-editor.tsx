import { Col, Grid, Input, Row, Space, Switch } from "antd";
import { useState } from "react";

import MDPreview from "@/components/md-preview";

const MDEditor = ({
  value,
  onChange,
}: {
  value?: string;
  onChange?: Function;
}) => {
  const onTextChange = (e: any) => {
    onChange?.(e);
  };
  const [preview, setPreview] = useState<boolean>(true);
  const screens = Grid.useBreakpoint();
  const span = preview && screens.sm ? 12 : 24;
  return (
    <Row gutter={16}>
      <Col span={span}>
        <Input.TextArea
          autoSize={{ minRows: 10 }}
          showCount
          maxLength={9681}
          onChange={onTextChange}
          value={value}
        />
        <Space align="end">
          <Switch
            size="small"
            checked={preview}
            onChange={() => setPreview(!preview)}
          />
          <span>预览</span>
        </Space>
      </Col>
      {preview && (
        <Col span={span}>
          <MDPreview src={value} />
        </Col>
      )}
    </Row>
  );
};

export default MDEditor;
