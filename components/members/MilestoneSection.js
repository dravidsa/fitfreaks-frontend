import React, { useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import styles from '@/styles/manage/Members.module.css';
import { FaFlag, FaCalendarAlt, FaListUl } from 'react-icons/fa';

const MilestoneSection = ({ milestone, onUpdatePlan }) => {
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [planData, setPlanData] = useState({
    startDate: milestone?.plan?.startDate || '',
    phases: milestone?.plan?.phases || [
      { name: '', duration: '', focus: '' }
    ]
  });

  const handleAddPhase = () => {
    setPlanData(prev => ({
      ...prev,
      phases: [...prev.phases, { name: '', duration: '', focus: '' }]
    }));
  };

  const handlePhaseChange = (index, field, value) => {
    const newPhases = [...planData.phases];
    newPhases[index] = { ...newPhases[index], [field]: value };
    setPlanData(prev => ({ ...prev, phases: newPhases }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdatePlan(planData);
    setShowPlanModal(false);
  };

  if (!milestone) {
    return (
      <Card className={styles.milestoneCard}>
        <Card.Body>
          <p className={styles.noMilestone}>No milestone set yet</p>
          <Button variant="primary" onClick={() => setShowPlanModal(true)}>
            Set Milestone
          </Button>
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      <Card className={styles.milestoneCard}>
        <Card.Body>
          <div className={styles.milestoneHeader}>
            <h3>Next Milestone</h3>
            <Button 
              variant="outline-primary"
              onClick={() => setShowPlanModal(true)}
            >
              Update Plan
            </Button>
          </div>

          <div className={styles.milestoneInfo}>
            <div className={styles.milestoneDetail}>
              <FaFlag className={styles.milestoneIcon} />
              <div>
                <h4>{milestone.goal}</h4>
                <p>{milestone.description}</p>
              </div>
            </div>

            <div className={styles.milestoneDetail}>
              <FaCalendarAlt className={styles.milestoneIcon} />
              <div>
                <h4>Event Date</h4>
                <p>{new Date(milestone.date).toLocaleDateString()}</p>
              </div>
            </div>

            {milestone.plan && (
              <div className={styles.milestoneDetail}>
                <FaListUl className={styles.milestoneIcon} />
                <div>
                  <h4>Training Plan</h4>
                  <p>Starts: {new Date(milestone.plan.startDate).toLocaleDateString()}</p>
                  <div className={styles.phases}>
                    {milestone.plan.phases.map((phase, index) => (
                      <div key={index} className={styles.phase}>
                        <strong>{phase.name}</strong>
                        <span>{phase.duration}</span>
                        <p>{phase.focus}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>

      {/* Plan Modal */}
      <Modal show={showPlanModal} onHide={() => setShowPlanModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Update Training Plan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={planData.startDate}
                onChange={(e) => setPlanData(prev => ({ ...prev, startDate: e.target.value }))}
              />
            </Form.Group>

            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5>Training Phases</h5>
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  onClick={handleAddPhase}
                >
                  Add Phase
                </Button>
              </div>

              {planData.phases.map((phase, index) => (
                <Card key={index} className="mb-3">
                  <Card.Body>
                    <Form.Group className="mb-2">
                      <Form.Label>Phase Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={phase.name}
                        onChange={(e) => handlePhaseChange(index, 'name', e.target.value)}
                        placeholder="e.g., Base Building"
                      />
                    </Form.Group>

                    <Form.Group className="mb-2">
                      <Form.Label>Duration</Form.Label>
                      <Form.Control
                        type="text"
                        value={phase.duration}
                        onChange={(e) => handlePhaseChange(index, 'duration', e.target.value)}
                        placeholder="e.g., 12 weeks"
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Focus</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={phase.focus}
                        onChange={(e) => handlePhaseChange(index, 'focus', e.target.value)}
                        placeholder="Phase focus and key workouts"
                      />
                    </Form.Group>
                  </Card.Body>
                </Card>
              ))}
            </div>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={() => setShowPlanModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Save Plan
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MilestoneSection;
