import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from '@/styles/GroupSections.module.css';
import { API_URL } from '@/config';


const AchievementsSection = ({ achievements }) => {
  return (
    <section className={`${styles.section} ${styles.achievementsSection}`}>
      <Container>
        <h2 className={styles.sectionTitle}>Our Achievements</h2>
        <Row>
          {achievements.map((achievement, index) => (
            <Col md={6} key={index} className="mb-4">
              <div className={styles.achievementCard}>
                <div className={styles.achievementImage}>
                  <img src={`${API_URL}${achievement.image?.data?.attributes?.url}`} alt={achievement.name} />
                </div>
                <div className={styles.achievementContent}>
                  <h3>{achievement.name}</h3>
                  <p className={styles.achievementDate}>{achievement.date}</p>
                  <p>{achievement.description}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default AchievementsSection;
