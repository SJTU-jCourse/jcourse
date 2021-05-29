import { Space } from 'antd';
import { createElement } from 'react';

const IconText = ({ icon, text }) => (
  <Space>
    {createElement(icon)}
    {text}
  </Space>
);

export default IconText;
