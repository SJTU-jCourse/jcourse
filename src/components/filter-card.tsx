import { Filter } from '@/models/filter';
import { Card, Checkbox, Divider, Tag, Button } from 'antd';

const FilterCard = ({
  categories,
  departments,
}: {
  categories: Filter[];
  departments: Filter[];
}) => {
  const onChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
  };
  return (
    <Card title="筛选" extra={<Button>确认</Button>}>
      <h3>课程类别</h3>
      <Checkbox.Group onChange={onChange}>
        {categories.map((item) => (
          <div key={item.name}>
            <Checkbox value={item.name}>{item.name}</Checkbox>
            <Tag>{item.count}</Tag>
          </div>
        ))}
      </Checkbox.Group>
      <Divider></Divider>
      <h3>开课单位</h3>
      <Checkbox.Group onChange={onChange}>
        {departments.map((item) => (
          <div key={item.name}>
            <Checkbox value={item.name}>{item.name}</Checkbox>
            <Tag>{item.count}</Tag>
          </div>
        ))}
      </Checkbox.Group>
    </Card>
  );
};

export default FilterCard;
