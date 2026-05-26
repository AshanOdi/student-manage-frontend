import { Button, Card, Input, message, Space, Table } from "antd";
import { useEffect, useState } from "react";
import api from "../services/api";
import type { Student } from "../types/types";
import StudentModal from "../components/StudentModal";

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false); //newwwwwwwww
  const [editingStudent, setEditingStudent] = useState<any>(null); //newwwwwwwww

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/students?search=${search}`);
      setStudents(response.data.data);
    } catch (error) {
      message.error("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStudents();
  }, [search]);

  const deleteStudent = async (id: number) => {
    try {
      await api.delete(`/students/${id}`);
      message.success("Student deleted");
      fetchStudents();
    } catch (error) {
      message.error("Delete failed");
    }
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "Course", dataIndex: "course" },
    { title: "Age", dataIndex: "age" },
    {
      title: "Actions",

      render: (_: any, record: Student) => (
        <Space>
          {user.role === "admin" && (
            <>
              <Button
                onClick={() => {
                  setEditingStudent(record);

                  setOpen(true);
                }}
              >
                Edit
              </Button>

              <Button danger onClick={() => deleteStudent(record.id)}>
                Delete
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];
  return (
    <div className="p-6">
      <Card title="Students" className="shadow-lg rounded-xl">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <Input.Search
              placeholder="Search students"
              allowClear
              onSearch={(value) => setSearch(value)}
              className="max-w-sm"
            />

            {user.role === "admin" && (
              <Button
                type="primary"
                onClick={() => {
                  setEditingStudent(null);

                  setOpen(true);
                }}
              >
                Create Student
              </Button>
            )}
          </div>
          <div className="overflow-x-auto">
            <Table
              rowKey="id"
              columns={columns}
              dataSource={students}
              loading={loading}
            />
            <StudentModal
              open={open}
              onClose={() => setOpen(false)}
              fetchStudents={fetchStudents}
              editingStudent={editingStudent}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
