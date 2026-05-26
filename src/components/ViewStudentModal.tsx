import { Modal, Tag } from "antd";

import type { Student } from "../types/types";

interface Props {
  open: boolean;

  onClose: () => void;

  student: Student | null;
}

export default function ViewStudentModal({
  open,

  onClose,

  student,
}: Props) {
  return (
    <Modal open={open} onCancel={onClose} footer={null} title="Student Details">
      <div className="space-y-4">
        <div>
          <p className="text-gray-500 text-sm">Name</p>

          <p className="font-medium">{student?.name}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Email</p>

          <p className="font-medium">{student?.email}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Course</p>

          <Tag color="blue">{student?.course}</Tag>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Age</p>

          <p className="font-medium">{student?.age}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Student ID</p>

          <p className="font-medium">#{student?.id}</p>
        </div>
      </div>
    </Modal>
  );
}
