import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaBook, FaShoppingBag, FaVideo, FaFileAlt } from 'react-icons/fa';
import styles from '@/styles/groups/GroupSections.module.css';

const ProductsResourcesSection = ({ resources }) => {
  const defaultResources = [
    {
      title: "Training Programs",
      description: "Structured training plans for all levels",
      icon: <FaBook className={styles.resourceIcon} />,
      link: "#"
    },
    {
      title: "Equipment Shop",
      description: "Quality gear and accessories",
      icon: <FaShoppingBag className={styles.resourceIcon} />,
      link: "/ecommerce"
    },
    {
      title: "Video Library",
      description: "Technique tutorials and tips",
      icon: <FaVideo className={styles.resourceIcon} />,
      link: "#"
    },
    {
      title: "Training Guides",
      description: "Downloadable PDF resources",
      icon: <FaFileAlt className={styles.resourceIcon} />,
      link: "#"
    }
  ];

  const items = resources || defaultResources;

  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.sectionTitle}>Products & Resources</h2>
        <Row>
          {items.map((item, index) => (
            <Col md={6} lg={3} key={index}>
              <Card className={styles.resourceCard}>
                <Card.Body>
                  <div className={styles.resourceIconWrapper}>
                    {item.icon}
                  </div>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <a href={item.link} className={styles.resourceLink}>
                    Learn More
                  </a>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default ProductsResourcesSection;
