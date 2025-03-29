import React, { useEffect, useState } from 'react';
import { Table, Button, Alert, Container } from 'react-bootstrap';
import { API_URL } from '../../../config';
import { useRouter } from 'next/router';
import EventHeader from '../../../components/manage/EventHeader';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('jwt');
      const userEmail = localStorage.getItem('userEmail');
      const userRole = localStorage.getItem('userRole');

      let url = `${API_URL}/api/events?populate=*`;
      if (userRole !== 'platform_admin') {
        url += `&filters[event_organiser]=${encodeURIComponent(userEmail)}`;
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }

      const data = await response.json();
      setEvents(data.data || []);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load events. Please try again.');
    }
  };

  return (
    <div>
      <EventHeader />
      <Container className="px-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Events Management</h2>
          <Button 
            variant="primary" 
            onClick={() => router.push('/manage/events/add')}
          >
            Add Event
          </Button>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}
        
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Date</th>
              <th>Location</th>
              <th>Sport Type</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.attributes.name}</td>
                <td>{new Date(event.attributes.date).toLocaleDateString()}</td>
                <td>{event.attributes.location}</td>
                <td>{event.attributes.sportType}</td>
                <td>{event.attributes.status}</td>
                <td>
                  <Button 
                    variant="warning" 
                    size="sm"
                    onClick={() => router.push(`/manage/events/${event.id}/edit`)}
                  >
                    Change
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default ManageEvents;
