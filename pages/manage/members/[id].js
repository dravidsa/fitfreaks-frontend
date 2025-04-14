import React from 'react';
import { useRouter } from 'next/router';
import { Container, Card, Row, Col, Table, Image, Button } from 'react-bootstrap';
import { FaRunning, FaSwimmer, FaBiking, FaClock, FaFire, FaRoute } from 'react-icons/fa';
import Layout from '@/components/global/layout';
import ManageNav from '@/components/manage/ManageNav';
import MilestoneSection from '@/components/members/MilestoneSection';
import { membersData } from '@/data/members';
import styles from '@/styles/manage/Members.module.css';

const getActivityIcon = (type) => {
  switch (type.toLowerCase()) {
    case 'running':
      return <FaRunning />;
    case 'swimming':
      return <FaSwimmer />;
    case 'cycling':
      return <FaBiking />;
    default:
      return null;
  }
};

export default function MemberDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const member = membersData.find(m => m.id === parseInt(id));

  if (!member) return <div>Loading...</div>;

  const handleUpdatePlan = (planData) => {
    // Here you would typically make an API call to update the plan
    console.log('Updating plan:', planData);
  };

  return (
    <Layout title={`Member: ${member.name}`}>
      <Container className="py-5">
        <ManageNav />
        
        {/* Profile Header */}
        <Card className={styles.profileHeader}>
          <Card.Body>
            <div className={styles.profileInfo}>
              <Image
                src={member.profilePhoto}
                alt={member.name}
                className={styles.profileImage}
                roundedCircle
              />
              <div>
                <h1 className={styles.memberName}>{member.name}</h1>
                <p className={styles.memberDetails}>
                  Member since {new Date(member.memberSince).toLocaleDateString()}
                </p>
                <div className={styles.contactInfo}>
                  <p>{member.email}</p>
                  <p>{member.phone}</p>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Milestone Section */}
        <MilestoneSection 
          milestone={member.milestone}
          onUpdatePlan={handleUpdatePlan}
        />

        {/* Activities Section */}
        <Card className={styles.activitiesCard}>
          <Card.Body>
            <h3>Recent Activities</h3>
            <Table responsive>
              <thead>
                <tr>
                  <th>Activity</th>
                  <th>Date</th>
                  <th>Duration</th>
                  <th>Distance</th>
                  <th>Calories</th>
                </tr>
              </thead>
              <tbody>
                {member.activities.map((activity) => (
                  <tr key={activity.id}>
                    <td>{activity.name}</td>
                    <td>{new Date(activity.date).toLocaleDateString()}</td>
                    <td>{activity.duration}</td>
                    <td>{activity.distance}</td>
                    <td>{activity.caloriesBurnt} kcal</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Row>
              {member.activities.map((activity) => (
                <Col md={6} lg={4} key={activity.id} className="mb-4">
                  <Card className={styles.activityCard}>
                    <Card.Body>
                      <div className={styles.activityHeader}>
                        <span className={styles.activityIcon}>
                          {getActivityIcon(activity.type)}
                        </span>
                        <div>
                          <h3>{activity.name}</h3>
                          <p className={styles.activityDate}>
                            {new Date(activity.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className={styles.activityStats}>
                        <div>
                          <FaClock /> <span>{activity.duration}</span>
                        </div>
                        <div>
                          <FaFire /> <span>{activity.caloriesBurnt} cal</span>
                        </div>
                        <div>
                          <FaRoute /> <span>{activity.distance}</span>
                        </div>
                      </div>

                      <Button 
                        variant="outline-primary" 
                        className={styles.viewActivityButton}
                        onClick={() => alert('Activity details coming soon!')}
                      >
                        View Activity
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  );
}
