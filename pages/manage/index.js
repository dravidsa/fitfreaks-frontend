import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/router';
import ManageLayout from '../../components/manage/ManageLayout';

const ManageDashboard = ({ userRole }) => {
  const router = useRouter();

  return (
    <div>
      <h2 className="mb-4">Management Dashboard</h2>
      <Row>
        <Col md={4} className="mb-4">
          <Card 
            className="h-100 cursor-pointer" 
            onClick={() => router.push('/manage/events')}
            style={{ cursor: 'pointer' }}
          >
            <Card.Body>
              <Card.Title>Events</Card.Title>
              <Card.Text>
                Manage your events, view enrollments, and configure email notifications.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card 
            className="h-100"
            style={{ cursor: 'pointer' }}
            onClick={() => router.push('/manage/profile')}
          >
            <Card.Body>
              <Card.Title>Profile</Card.Title>
              <Card.Text>
                Update your profile information and preferences.
                <br />
                <small className="text-muted">(Under Development)</small>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

ManageDashboard.getLayout = (page) => <ManageLayout>{page}</ManageLayout>;

export default ManageDashboard;
