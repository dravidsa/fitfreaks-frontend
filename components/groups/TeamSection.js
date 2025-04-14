import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';
import styles from '@/styles/GroupSections.module.css';

const TeamSection = ({ team }) => {
  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.sectionTitle}>Our Team</h2>
        <Row>
          {team.map((member, index) => (
            <Col md={4} key={index} className="mb-4">
              <div className={styles.teamMember}>
                <div className={styles.memberImage}>
                  <img src={member.image} alt={member.name} />
                </div>
                <div className={styles.memberInfo}>
                  <h3>{member.name}</h3>
                  <p className={styles.memberRole}>{member.role}</p>
                  <p className={styles.memberBio}>{member.bio}</p>
                  <div className={styles.memberSocial}>
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                        <FaLinkedin />
                      </a>
                    )}
                    {member.twitter && (
                      <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                        <FaTwitter />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default TeamSection;
