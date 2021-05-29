import { Result } from 'antd';

const NotFound = () => {
  return (
    <Result
      status="404"
      title="哎呀抱歉，你要找的页面找不到了"
      subTitle="如果这是网站的bug，或者要找的页面你很重要，请邮件联系我们：jcourse@sjtu.plus"
    />
  );
};
export default NotFound;
