import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import AdminLayout from '../../components/admin/AdminLayout';

const Dashboard = () => {
  // Dummy data for demonstration
  const stats = {
    users: 150,
    events: 45,
    merchants: 28,
    coaches: 32
  };

  return (
    <AdminLayout>
      <h2 className="mb-4">Dashboard</h2>
      <Row>
        <Col md={3} className="mb-4">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <h3>{stats.users}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-4">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Events</Card.Title>
              <h3>{stats.events}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-4">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Merchants</Card.Title>
              <h3>{stats.merchants}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-4">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Coaches</Card.Title>
              <h3>{stats.coaches}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default Dashboard;
