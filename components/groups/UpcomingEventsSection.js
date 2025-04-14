import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';
import styles from '@/styles/GroupSections.module.css';

const UpcomingEventsSection = ({ events }) => {
  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.sectionTitle}>Upcoming Events</h2>
        <Row>
          {events.map((event, index) => (
            <Col md={6} lg={4} key={index} className="mb-4">
              <Card className={styles.eventCard}>
                <Card.Img variant="top" src={event.image} />
                <Card.Body>
                  <Card.Title>{event.name}</Card.Title>
                  <div className={styles.eventMeta}>
                    <div>
                      <FaCalendar /> {event.date}
                    </div>
                    <div>
                      <FaMapMarkerAlt /> {event.location}
                    </div>
                  </div>
                  <Card.Text>{event.description}</Card.Text>
                  <Link href={`/events/${event.id}`} passHref>
                    <Button variant="primary">Learn More</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default UpcomingEventsSection;
