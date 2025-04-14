import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import styles from '@/styles/GroupSections.module.css';

const ServicesSection = ({ services }) => {
  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.sectionTitle}>Products & Services</h2>
        <Row>
          {services.map((service, index) => (
            <Col md={6} lg={4} key={index} className="mb-4">
              <Card className={styles.serviceCard}>
                <Card.Img variant="top" src={service.image} />
                <Card.Body>
                  <Card.Title>{service.title}</Card.Title>
                  <Card.Text>{service.description}</Card.Text>
                  {service.price && (
                    <div className={styles.servicePrice}>
                      Starting from ₹{service.price}
                    </div>
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

export default ServicesSection;
