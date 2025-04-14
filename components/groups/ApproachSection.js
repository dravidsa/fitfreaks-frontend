import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from '@/styles/groups/GroupSections.module.css';

const ApproachSection = ({ approach }) => {
  // Split the approach items into rows of 2
  const rows = [];
  for (let i = 0; i < approach.length; i += 2) {
    rows.push(approach.slice(i, i + 2));
  }

  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.sectionTitle}>Our Approach</h2>
        {rows.map((row, rowIndex) => (
          <Row key={rowIndex} className={styles.approachRow}>
            {row.map((item, index) => (
              <Col md={6} key={index}>
                <div className={styles.approachCard}>
                  <div className={styles.approachIcon}>{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        ))}
      </Container>
    </section>
  );
};

export default ApproachSection;
