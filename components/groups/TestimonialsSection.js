import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import styles from '@/styles/groups/GroupSections.module.css';

const TestimonialsSection = ({ testimonials }) => {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.sectionTitle}>Testimonials</h2>
        <Row className="justify-content-center">
          {testimonials.map((testimonial, idx) => (
            <Col md={6} lg={4} key={testimonial.id || idx} className="mb-4">
              <Card className={styles.testimonialCard}>
                <Card.Body>
                  <Card.Text className={styles.testimonialText}>
                    "{testimonial.description}"
                  </Card.Text>
                  <Card.Title className={styles.testimonialAuthor}>
                    - {testimonial.name }
                    <span className={styles.testimonialAvatarWrapper}>
                      {testimonial.image?.data?.attributes?.url ? (
                        <img
                          src={testimonial.image.data.attributes.url.startsWith('http') ? testimonial.image.data.attributes.url : `${process.env.NEXT_PUBLIC_API_URL || ''}${testimonial.image.data.attributes.url}`}
                          alt={testimonial.name}
                          className={styles.testimonialAvatar}
                        />
                      ) : (
                        <span className={styles.testimonialAvatarPlaceholder}></span>
                      )}
                    </span>
                  </Card.Title>
                  {testimonial.designation && (
                    <div className={styles.testimonialDesignation}>{testimonial.designation}</div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default TestimonialsSection;
