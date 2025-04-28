import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import styles from '@/styles/GroupSections.module.css';
import { API_URL } from '@/config';

console.log("in section component" );



const ServicesSection = ({ services }) => {
  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.sectionTitle}>Products & Services</h2>
        <Row>
          {services.map((service, index) => (
            <Col md={3} lg={3} xl={3} key={index} className="mb-4">
              <Card className={styles.serviceCard}>
                <Card.Img variant="top" src={`${API_URL}${service.image?.data?.attributes?.url}`} />
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
