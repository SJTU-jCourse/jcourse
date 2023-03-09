export const AccountRule = {
  max: 50,
  required: true,
  pattern: /^([a-zA-Z0-9-_\.]+)$/,
  message: "请正确输入 jAccount 用户名",
};

export const CodeRule = {
  required: true,
  len: 6,
  message: "请输入正确的验证码",
};
