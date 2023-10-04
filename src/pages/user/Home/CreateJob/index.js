import { Input, Button, Modal, Form } from "antd";
import { useEffect } from "react";

function CreateJob({
  setIsShowCreateModal,
  handleCreateJob,
  isShowCreateModal,
}) {
  const [createForm] = Form.useForm();
  useEffect(() => {
    if (isShowCreateModal) {
      createForm.resetFields();
    }
  }, [isShowCreateModal]);
  return (
    <Modal
      title="Add Job"
      open={isShowCreateModal}
      onCancel={() => setIsShowCreateModal(false)}
      footer={null}
    >
      <Form
        form={createForm}
        name="addJob"
        layout="vertical"
        onFinish={handleCreateJob}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Please input your title!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Content"
          name="content"
          rules={[
            {
              required: true,
              message: "Please input your content!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Button htmlType="submit" type="primary" block>
          Add
        </Button>
      </Form>
    </Modal>
  );
}

export default CreateJob;
