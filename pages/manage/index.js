import React from 'react';
import Link from 'next/link';
import { Card, Row, Col, Container } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { FaCalendarAlt, FaUsers, FaUserCog, FaDumbbell } from 'react-icons/fa';
import Layout from '@/components/global/layout';
import ManageNav from '@/components/manage/ManageNav';
import { membersData } from '@/data/members';
import styles from '@/styles/manage/Dashboard.module.css';

const ManageDashboard = () => {
  const router = useRouter();

  // Get last 6 members for preview
  const recentMembers = membersData.slice(0, 6);

  const manageItems = [
    {
      title: 'Events',
      description: 'Manage events, track registrations, and send notifications.',
      icon: <FaCalendarAlt />,
      link: '/manage/events'
    },
    {
      title: 'Members',
      description: 'View and manage member profiles and activities.',
      icon: <FaUsers />,
      link: '/manage/members'
    },
    {
      title: 'Profile',
      description: 'Update your profile information and preferences.',
      icon: <FaUserCog />,
      link: '/manage/profile'
    },
    {
      title: 'Workout Library',
      description: 'Browse and create workout templates.',
      icon: <FaDumbbell />,
      link: '/manage/workout_library'
    }
  ];

  return (
    <Layout title="Management Dashboard">
      <Container>
        <ManageNav />
        <h2 className={styles.pageTitle}>Management Dashboard</h2>
        
        {/* Quick Access Cards */}
        <Row className="mb-5">
          {manageItems.map((item, index) => (
            <Col key={index} md={3} className="mb-4">
              <Link href={item.link} className={styles.cardLink}>
                <Card 
                  className={styles.quickAccessCard} 
                >
                  <Card.Body>
                    <div className={styles.cardIcon}>
                      {item.icon}
                    </div>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>
                      {item.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>

        {/* Recent Members Section */}
        <section className={styles.membersSection}>
          <div className={styles.sectionHeader}>
            <h3>Recent Members</h3>
            <button 
              className={styles.viewAllButton}
              onClick={() => router.push('/manage/members')}
            >
              View All
            </button>
          </div>
          
          <Row>
            {recentMembers.map((member) => (
              <Col key={member.id} md={4} lg={2} className="mb-4">
                <Link href={`/manage/members/${member.id}`} className={styles.cardLink}>
                  <Card 
                    className={styles.memberCard}
                  >
                    <div className={styles.memberImageWrapper}>
                      <Card.Img 
                        variant="top" 
                        src={member.profilePhoto} 
                        className={styles.memberImage}
                      />
                    </div>
                    <Card.Body>
                      <Card.Title className={styles.memberName}>
                        {member.name}
                      </Card.Title>
                      <Card.Text className={styles.memberSince}>
                        Member since {new Date(member.memberSince).toLocaleDateString()}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </section>
      </Container>
    </Layout>
  );
};

export default ManageDashboard;
