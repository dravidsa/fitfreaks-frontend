import React, { useState } from 'react';
import { Form, Button, Alert, Container, Card } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { API_URL } from '../../config';

const AdminLogin = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Use regular authentication endpoint
      const res = await fetch(`${API_URL}/api/auth/local`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.message || 'Login failed');
      }

      // Check if user has platform_admin role using email
      const userRes = await fetch(`${API_URL}/api/fitfreaks-users?filters[email]=${encodeURIComponent(formData.identifier)}`, {
        headers: {
          Authorization: `Bearer ${data.jwt}`
        }
      });

      const userData = await userRes.json();

      if (!userData.data?.[0]?.attributes?.role?.includes('platform_admin')) {
        throw new Error('Unauthorized: Not an admin user');
      }

      // Store auth data
      localStorage.setItem('jwt', data.jwt);
      localStorage.setItem('userId', data.user.id);
      localStorage.setItem('userEmail', formData.identifier);
      router.push('/admin');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-center">
        <Card style={{ width: '400px' }}>
          <Card.Body>
            <Card.Title className="text-center mb-4">Admin Login</Card.Title>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="identifier"
                  value={formData.identifier}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default AdminLogin;
