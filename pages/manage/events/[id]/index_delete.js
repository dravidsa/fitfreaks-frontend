import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card, Row, Col, Button, Alert, Badge } from 'react-bootstrap';
import ManageLayout from '../../../../components/manage/ManageLayout';
import { API_URL } from '../../../../config';
import Image from 'next/image';

const ViewEvent = () => {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchEvent();
    }
  }, [id]);

  const fetchEvent = async () => {
    try {
      const token = localStorage.getItem('jwt');
      const response = await fetch(`${API_URL}/api/events/${id}?populate=*`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch event');
      }

      const data = await response.json();
      setEvent(data.data);
    } catch (error) {
      setError('Failed to load event. ' + error.message);
    }
  };

  if (!event) {
    return (
      <div className="px-4">
        {error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }

  return (
    <div className="px-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>View Event</h2>
        <div>
          <Button 
            variant="secondary" 
            className="me-2"
            onClick={() => router.push('/manage/events')}
          >
            Back
          </Button>
          <Button 
            variant="warning"
            onClick={() => router.push(`/manage/events/${id}/edit`)}
          >
            Edit
          </Button>
        </div>
      </div>

      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <Row className="mb-3">
                <Col md={3} className="fw-bold">Event Name:</Col>
                <Col md={9}>{event.attributes.name}</Col>
              </Row>

              <Row className="mb-3">
                <Col md={3} className="fw-bold">Date and Time:</Col>
                <Col md={9}>{new Date(event.attributes.dateTime).toLocaleString()}</Col>
              </Row>

              <Row className="mb-3">
                <Col md={3} className="fw-bold">Description:</Col>
                <Col md={9}>{event.attributes.description}</Col>
              </Row>

              <Row className="mb-3">
                <Col md={3} className="fw-bold">Location:</Col>
                <Col md={9}>
                  <div>{event.attributes.location}</div>
                  <div className="text-muted small">GPS: {event.attributes.locationGPS}</div>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={3} className="fw-bold">Sports Type:</Col>
                <Col md={9}>{event.attributes.sportsType}</Col>
              </Row>

              <Row className="mb-3">
                <Col md={3} className="fw-bold">Status:</Col>
                <Col md={9}>
                  <Badge bg={event.attributes.status === 'draft' ? 'secondary' : 'success'}>
                    {event.attributes.status.toUpperCase()}
                  </Badge>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <h4 className="mb-3">Categories</h4>
              {event.attributes.categories?.map((category, index) => (
                <div key={index} className="mb-2 p-2 border rounded">
                  <div className="fw-bold">{category.name} - ₹{category.price}</div>
                  <div className="text-muted small">{category.description}</div>
                </div>
              ))}
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h4 className="mb-3">Additional Settings</h4>
              <Row>
                <Col md={6}>
                  <div className="mb-2">
                    <Badge bg={event.attributes.gstEnabled ? 'success' : 'secondary'} className="me-2">
                      GST
                    </Badge>
                    {event.attributes.gstEnabled && 
                      <span className="text-muted">({event.attributes.gstSource})</span>
                    }
                  </div>
                  <div className="mb-2">
                    <Badge bg={event.attributes.platformFeesEnabled ? 'success' : 'secondary'} className="me-2">
                      Platform Fees
                    </Badge>
                    {event.attributes.platformFeesEnabled && 
                      <span className="text-muted">({event.attributes.platformFeesSource})</span>
                    }
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-2">
                    <Badge bg={event.attributes.tshirtEnabled ? 'success' : 'secondary'} className="me-2">
                      T-shirt
                    </Badge>
                    {event.attributes.tshirtEnabled && 
                      <span className="text-muted">({event.attributes.tshirtSizes})</span>
                    }
                  </div>
                  <div className="mb-2">
                    <Badge bg={event.attributes.dobFlag ? 'success' : 'secondary'} className="me-2">
                      DOB Required
                    </Badge>
                  </div>
                  <div className="mb-2">
                    <Badge bg={event.attributes.termsFlag ? 'success' : 'secondary'} className="me-2">
                      Terms & Conditions
                    </Badge>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <h4 className="mb-3">Event Banner</h4>
              {event.attributes.banner ? (
                <Image
                  src={event.attributes.banner}
                  alt="Event banner"
                  width={400}
                  height={300}
                  className="w-100 h-auto"
                />
              ) : (
                <div className="text-center p-4 bg-light">
                  No banner uploaded
                </div>
              )}
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h4 className="mb-3">Event Details</h4>
              <div className="mb-2">
                <div className="fw-bold">Price:</div>
                <div>₹{event.attributes.price}</div>
              </div>
              <div className="mb-2">
                <div className="fw-bold">Available Tickets:</div>
                <div>{event.attributes.numTickets}</div>
              </div>
              <div>
                <div className="fw-bold">Organizer:</div>
                <div>{event.attributes.organizingGroup}</div>
                <div className="text-muted small">{event.attributes.organizerEmail}</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

ViewEvent.getLayout = (page) => <ManageLayout>{page}</ManageLayout>;

export default ViewEvent;
