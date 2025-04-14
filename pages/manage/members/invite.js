import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Layout from '@/components/global/layout';
import ManageNav from '@/components/manage/ManageNav';
import styles from '@/styles/manage/Members.module.css';

export default function InviteMemberPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Here you would typically make an API call to send the invitation
      // For now, we'll just simulate it with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect back to members list
      router.push('/manage/members');
    } catch (err) {
      setError('Failed to send invitation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout title="Invite Member">
      <Container className="py-5">
        <ManageNav />
        <div className={styles.headerSection}>
          <h1 className={styles.pageTitle}>Invite Member</h1>
        </div>

        <Card className={styles.formCard}>
          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter member's name"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter member's email"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter member's phone number"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Personal Message (Optional)</Form.Label>
                <Form.Control
                  as="textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Add a personal message to the invitation"
                />
              </Form.Group>

              <div className={styles.formActions}>
                <Button
                  variant="secondary"
                  onClick={() => router.push('/manage/members')}
                  className="me-2"
                >
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send Invitation'}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  );
}
