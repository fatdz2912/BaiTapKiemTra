import { Input, Button, Modal, Form } from "antd";
import { useEffect } from "react";

function CreateTask({ handleCreateTask, isShowCreateModal }) {
  const [createForm] = Form.useForm();
  useEffect(() => {
    if (isShowCreateModal) {
      createForm.resetFields();
    }
  }, [isShowCreateModal]);
  return (
    <Form
      form={createForm}
      name="addTask"
      layout="vertical"
      onFinish={handleCreateTask}
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
  );
}

export default CreateTask;
