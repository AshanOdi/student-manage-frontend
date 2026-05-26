import { Button, Form, Input, InputNumber, Modal, message } from "antd";

import api from "../services/api";

interface Props {
  open: boolean;

  onClose: () => void;

  fetchStudents: () => void;

  editingStudent?: any;
}

export default function StudentModal({
  open,

  onClose,

  fetchStudents,

  editingStudent,
}: Props) {
  const [form] = Form.useForm();

  const isEditing = !!editingStudent;

  const onFinish = async (values: any) => {
    try {
      if (isEditing) {
        await api.put(
          `/students/${editingStudent.id}`,

          values,
        );

        message.success("Student updated");
      } else {
        await api.post(
          "/students",

          values,
        );

        message.success("Student created");
      }

      form.resetFields();

      fetchStudents();

      onClose();
    } catch (error) {
      message.error("Operation failed");
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title={isEditing ? "Edit Student" : "Create Student"}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Course"
          name="course"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Age"
          name="age"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          {isEditing ? "Update" : "Create"}
        </Button>
      </Form>
    </Modal>
  );
}
