import React, { useEffect, useState } from 'react';
import { Table, Button, Alert, Container } from 'react-bootstrap';
import { API_URL } from '../../../config';
import { useRouter } from 'next/router';
import Layout from '@/components/global/layout';
import ManageNav from '@/components/manage/ManageNav';
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

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch events');
      }

      const data = await res.json();
      setEvents(data.data);
    } catch (err) {
      setError('Error fetching events');
      console.error(err);
    }
  };

  return (
    <Layout title="Manage Events">
      <Container>
        <ManageNav />
        <EventHeader />
        {error && <Alert variant="danger">{error}</Alert>}
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Location</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td>{event.attributes.name}</td>
                  <td>{new Date(event.attributes.date).toLocaleDateString()}</td>
                  <td>{event.attributes.location}</td>
                  <td>{event.attributes.status}</td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      className="me-2"
                      onClick={() => router.push(`/manage/events/${event.id}`)}
                    >
                      View
                    </Button>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => router.push(`/manage/events/${event.id}/edit`)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => router.push(`/manage/events/${event.id}/enrollments`)}
                    >
                      Enrollments
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </Layout>
  );
};

export default ManageEvents;
