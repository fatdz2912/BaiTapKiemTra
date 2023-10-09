import { Input, Form, Col, Card, Button, Space, Popconfirm } from "antd";
import { useState } from "react";
function TaskItem({ handleUpdateTask, id, title, content, handleDeleteTask }) {
  const [isShowUpdate, setIsShowUpdate] = useState(false);

  const [updateForm] = Form.useForm();
  if (isShowUpdate) {
    return (
      <Col lg={12} md={12} sm={24} xs={24}>
        <Card title="Thay đổi">
          <Form
            form={updateForm}
            name="addTask"
            layout="vertical"
            initialValues={{
              title: title,
              content: content,
            }}
            onFinish={(values) => {
              handleUpdateTask(id, values);
              setIsShowUpdate(false);
            }}
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
            <Space size={25}>
              <Button htmlType="submit" type="primary">
                Xác nhận
              </Button>
              <Button type="primary" onClick={() => setIsShowUpdate(false)}>
                Hủy
              </Button>
              <Popconfirm
                title="Xóa công việc"
                description="Bạn có chắc chắn muốn xóa?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => handleDeleteTask(id)}
              >
                <Button danger>Delete</Button>
              </Popconfirm>
            </Space>
          </Form>
        </Card>
      </Col>
    );
  }
  return (
    <Col lg={6} md={8} sm={8} xs={12}>
      <Card size="small" title={title}>
        <p style={{ minHeight: "10vh" }}>{content}</p>
        <Space size={24}>
          <Button
            type="primary"
            onClick={() => {
              setIsShowUpdate(true);
            }}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Xóa công việc"
            description="Bạn có chắc chắn muốn xóa?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDeleteTask(id)}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      </Card>
    </Col>
  );
}

export default TaskItem;
