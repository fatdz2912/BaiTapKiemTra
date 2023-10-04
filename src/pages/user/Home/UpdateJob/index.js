import { Input, Button, Modal, Form } from "antd";
import { useEffect } from "react";

function UpdateJob({
  isShowUpdateModal,
  setIsShowUpdateModal,
  handleUpdateJob,
  cancelUpdate,
  deleteUpdate,
  setCancelUpdate,
  setdeleteUpdate,
  updateData,
}) {
  const [updateForm] = Form.useForm();
  useEffect(() => {
    if (isShowUpdateModal) {
      updateForm.setFieldsValue({
        title: updateData.title,
        content: updateData.content,
      });
    }
  }, [isShowUpdateModal, cancelUpdate]);
  useEffect(() => {
    updateForm.setFieldsValue({
      title: "",
      content: "",
    });
  }, [deleteUpdate]);
  return (
    <Modal
      title="Update Job"
      open={isShowUpdateModal}
      onCancel={() => setIsShowUpdateModal(false)}
      footer={null}
    >
      <Form
        form={updateForm}
        initialValues={{
          title: updateData.title,
          content: updateData.content,
        }}
        name="updateJob"
        layout="vertical"
        onFinish={(values) => handleUpdateJob(values)}
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button htmlType="submit" type="primary">
            Xác nhận
          </Button>
          <Button type="primary" onClick={() => setCancelUpdate(!cancelUpdate)}>
            Hủy
          </Button>
          <Button type="primary" onClick={() => setdeleteUpdate(!deleteUpdate)}>
            Xóa
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default UpdateJob;
