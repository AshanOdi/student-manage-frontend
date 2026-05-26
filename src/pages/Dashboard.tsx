import { Card, Col, Row } from "antd";

export default function Dashboard() {
  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card title="Total Students">120</Card>
      </Col>

      <Col span={8}>
        <Card title="Courses">8</Card>
      </Col>

      <Col span={8}>
        <Card title="Staff Members">5</Card>
      </Col>
    </Row>
  );
}
