import React, { useEffect, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useRouter } from 'next/router';
import ManageLayout from '../../../components/manage/ManageLayout';
import { API_URL } from '../../../config';

const EditEvent = () => {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (id) {
      fetchEvent();
    }
  }, [id]);

  const fetchEvent = async () => {
    try {
      const token = localStorage.getItem('jwt');
      const response = await fetch(`${API_URL}/api/events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch event');
      }

      const data = await response.json();
      setEvent(data.data.attributes);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('jwt');
      const response = await fetch(`${API_URL}/api/events/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ data: event })
      });

      if (!response.ok) {
        throw new Error('Failed to update event');
      }

      setSuccess('Event updated successfully');
    } catch (error) {
      setError(error.message);
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Event</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Event Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={event.name || ''}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="datetime-local"
            name="date"
            value={event.date ? new Date(event.date).toISOString().slice(0, 16) : ''}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={event.location || ''}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={event.description || ''}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Select
            name="status"
            value={event.status || ''}
            onChange={handleChange}
            required
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="cancelled">Cancelled</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Event
        </Button>
        <Button variant="secondary" className="ms-2" onClick={() => router.back()}>
          Back
        </Button>
      </Form>
    </div>
  );
};

EditEvent.getLayout = (page) => <ManageLayout>{page}</ManageLayout>;

export default EditEvent;
