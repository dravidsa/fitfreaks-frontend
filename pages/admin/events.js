import React, { useEffect, useState } from 'react';
import { Table, Button, Alert, Badge } from 'react-bootstrap';
import AdminLayout from '../../components/admin/AdminLayout';
import { API_URL } from '../../config';
import { useRouter } from 'next/router';

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('jwt');
      const response = await fetch(`${API_URL}/api/events?populate=*`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }

      const data = await response.json();
      setEvents(data.data || []);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleStatusChange = async (eventId, newStatus) => {
    try {
      const token = localStorage.getItem('jwt');
      const response = await fetch(`${API_URL}/api/events/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          data: {
            status: newStatus
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update event status');
      }

      setSuccess('Event status updated successfully');
      fetchEvents(); // Refresh the list
    } catch (error) {
      setError(error.message);
    }
  };

  const handleViewEnrollments = (eventId) => {
    router.push(`/manage/events/${eventId}/enrollments`);
  };

  const handleEditEvent = (eventId) => {
    router.push(`/manage/events/${eventId}`);
  };

  const getStatusBadge = (status) => {
    const variants = {
      draft: 'secondary',
      published: 'success',
      cancelled: 'danger'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  return (
    <div>
      <h2>Manage Events</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Organizer</th>
            <th>Date</th>
            <th>Location</th>
            <th>Status</th>
            <th>Enrollments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.attributes.name}</td>
              <td>{event.attributes.event_organiser}</td>
              <td>{new Date(event.attributes.date).toLocaleDateString()}</td>
              <td>{event.attributes.location}</td>
              <td>{getStatusBadge(event.attributes.status)}</td>
              <td>{event.attributes.enrollments?.data?.length || 0}</td>
              <td>
                <Button 
                  variant="primary" 
                  size="sm" 
                  className="me-2"
                  onClick={() => handleEditEvent(event.id)}
                >
                  Edit
                </Button>
                <Button 
                  variant="info" 
                  size="sm" 
                  className="me-2"
                  onClick={() => handleViewEnrollments(event.id)}
                >
                  Enrollments
                </Button>
                <div className="btn-group">
                  {event.attributes.status !== 'published' && (
                    <Button 
                      variant="success" 
                      size="sm"
                      onClick={() => handleStatusChange(event.id, 'published')}
                    >
                      Publish
                    </Button>
                  )}
                  {event.attributes.status !== 'cancelled' && (
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => handleStatusChange(event.id, 'cancelled')}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

AdminEvents.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default AdminEvents;
