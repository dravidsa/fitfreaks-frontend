import React, { useState } from 'react';
import { Container, Card, Row, Col, Button, Badge, Form, InputGroup } from 'react-bootstrap';
import { FaBiking, FaRunning, FaSwimmer, FaDumbbell, FaYinYang, FaSearch, FaPlus } from 'react-icons/fa';
import Layout from '@/components/global/layout';
import ManageNav from '@/components/manage/ManageNav';
import { workoutData } from '@/data/workouts';
import styles from '@/styles/manage/WorkoutLibrary.module.css';

const getWorkoutIcon = (type) => {
  switch (type) {
    case 'CYCLING':
      return <FaBiking />;
    case 'RUNNING':
      return <FaRunning />;
    case 'SWIMMING':
      return <FaSwimmer />;
    case 'STRENGTH':
      return <FaDumbbell />;
    case 'RECOVERY':
      return <FaYinYang />;
    default:
      return <FaDumbbell />;
  }
};

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'BEGINNER':
      return 'success';
    case 'INTERMEDIATE':
      return 'warning';
    case 'ADVANCED':
      return 'danger';
    default:
      return 'primary';
  }
};

export default function WorkoutLibraryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  const filteredWorkouts = workoutData.filter(workout => {
    const matchesSearch = workout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workout.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'ALL' || workout.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <Layout title="Workout Library">
      <Container className="py-5">
        <ManageNav />
        
        <div className={styles.headerSection}>
          <div className={styles.titleSection}>
            <h1 className={styles.pageTitle}>Workout Library</h1>
            <Button 
              variant="primary"
              className={styles.addButton}
              onClick={() => alert('Create workout feature coming soon!')}
            >
              <FaPlus /> Create Workout
            </Button>
          </div>

          <div className={styles.filterSection}>
            <InputGroup className={styles.searchBar}>
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search workouts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>

            <div className={styles.typeFilters}>
              <Button
                variant={filterType === 'ALL' ? 'primary' : 'outline-primary'}
                onClick={() => setFilterType('ALL')}
              >
                All
              </Button>
              {['CYCLING', 'RUNNING', 'SWIMMING', 'STRENGTH', 'RECOVERY'].map(type => (
                <Button
                  key={type}
                  variant={filterType === type ? 'primary' : 'outline-primary'}
                  onClick={() => setFilterType(type)}
                  className={styles.filterButton}
                >
                  {getWorkoutIcon(type)} {type.charAt(0) + type.slice(1).toLowerCase()}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <Row>
          {filteredWorkouts.map(workout => (
            <Col key={workout.id} md={6} lg={4} className="mb-4">
              <Card className={styles.workoutCard}>
                {workout.route && (
                  <div className={styles.workoutImageContainer}>
                    <Card.Img 
                      variant="top" 
                      src={workout.route}
                      alt={workout.name}
                      className={styles.workoutImage}
                    />
                    <div className={styles.workoutImageOverlay}>
                      <Badge 
                        bg={getDifficultyColor(workout.difficulty)}
                        className={styles.difficultyBadge}
                      >
                        {workout.difficulty}
                      </Badge>
                      <span className={styles.workoutIcon}>
                        {getWorkoutIcon(workout.type)}
                      </span>
                    </div>
                  </div>
                )}
                <Card.Body>
                  <Card.Title className={styles.workoutTitle}>
                    {workout.name}
                  </Card.Title>

                  <div className={styles.workoutDetails}>
                    <span>{workout.duration}</span>
                    {workout.distance && <span>• {workout.distance}</span>}
                    {workout.elevation && <span>• {workout.elevation} elevation</span>}
                  </div>

                  <Card.Text className={styles.workoutDescription}>
                    {workout.description}
                  </Card.Text>

                  <div className={styles.workoutTags}>
                    {workout.tags.map((tag, index) => (
                      <Badge 
                        key={index} 
                        bg="light" 
                        text="dark" 
                        className={styles.tag}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className={styles.workoutActions}>
                    <Button 
                      variant="outline-primary"
                      onClick={() => alert('View workout details coming soon!')}
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="outline-secondary"
                      onClick={() => alert('Edit workout coming soon!')}
                    >
                      Edit
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Layout>
  );
}
