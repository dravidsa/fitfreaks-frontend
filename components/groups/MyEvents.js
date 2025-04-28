import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { API_URL } from '@/config';
import styles from '@/styles/groups/GroupSections.module.css';

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  // Use fixed locale to avoid hydration mismatch
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

const MyEvents = ({ events }) => {
  //console.log("events found in comp are  ", JSON.stringify(events));
  if (!events || events.length === 0) {
    return (
      <Container className="mb-5">
        <h2 className={styles.sectionTitle}>Past and future events</h2>
        <p>No events found for this group.</p>
      </Container>
    );
  }

  // Sort events: future first, then past (by date descending)
  const now = new Date();
  const futureEvents = events.filter(evt => new Date(evt.date) >= now).sort((a, b) => new Date(a.date) - new Date(b.date));
  const pastEvents = events.filter(evt => new Date(evt.date) < now).sort((a, b) => new Date(b.date) - new Date(a.date));

  //console.log("past events count " + pastEvents.length + "future events count " + futureEvents.length + "total events " + events.length);
  return (
    <Container className="mb-5">
      <h2 className={styles.sectionTitle}>Past and future events</h2>
      <Row>
        {events.map((evt, idx) => (
          <Col md={6} lg={4} key={evt.id || idx} className="mb-4">
            <div className={styles.eventCard}>
              <div className={styles.eventImage}>
                {evt.attributes.image?.data?.attributes?.url && (
                  <img
                    src={`${API_URL}${evt?.attributes?.image?.data?.attributes?.url}`}
                    alt={evt?.attributes?.image?.data?.attributes?.name || evt?.attributes?.name}
                    className="img-fluid"
                  />
                )}
              </div>
              <div className={styles.eventContent}>
                  <h3>{evt?.attributes?.name}</h3>
                <p className={styles.eventDate}>{formatDate(evt?.attributes?.date)}</p>
                <p>{evt.attributes.description}</p>
                {evt.attributes.slug && (
                  <a href={`/events/${evt.attributes.slug}`} className={styles.eventLink}>
                    View Event
                  </a>
                )}
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MyEvents;
