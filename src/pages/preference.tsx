import { Button, Card, Modal } from "antd";
import Head from "next/head";
import { useState } from "react";

import PageHeader from "@/components/page-header";
import ResetPasswordForm from "@/components/reset-password-form";

const PreferencePage = () => {
  const [resetModalOpen, setResetModalOpen] = useState<boolean>(false);
  return (
    <>
      <PageHeader title="偏好设置" onBack={() => history.back()} />
      <Head>
        <title>偏好设置 - SJTU选课社区</title>
      </Head>
      <Card title="登录安全">
        <Button onClick={() => setResetModalOpen(true)}>重置密码</Button>
        <Modal
          title="设置或重置登录密码"
          open={resetModalOpen}
          footer={null}
          onCancel={() => setResetModalOpen(false)}
        >
          <ResetPasswordForm
            onSuccessFinish={() => setResetModalOpen(false)}
          ></ResetPasswordForm>
        </Modal>
      </Card>
    </>
  );
};
export default PreferencePage;
