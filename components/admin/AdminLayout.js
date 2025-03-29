import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { API_URL } from '../../config';

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('jwt');
      const userEmail = localStorage.getItem('userEmail');

      if (!token || !userEmail) {
        router.push('/admin/login');
        return;
      }

      try {
        // Check if user has platform_admin role using email
        const response = await fetch(`${API_URL}/api/fitfreaks-users?filters[email]=${encodeURIComponent(userEmail)}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Authentication failed');
        }

        const userData = await response.json();
        
        if (!userData.data?.[0]?.attributes?.role?.includes('platform_admin')) {
          throw new Error('Not an admin user');
        }

        setIsAuthenticated(true);
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('jwt');
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        router.push('/admin/login');
      }
    };

    checkAuth();
  }, []);

  if (!isAuthenticated) {
    return <div>Checking authentication...</div>;
  }

  return (
    <div className="admin-layout">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/admin">FitFreaks Admin</Navbar.Brand>
          <Navbar.Toggle aria-controls="admin-navbar" />
          <Navbar.Collapse id="admin-navbar">
            <Nav className="me-auto">
              <Nav.Link href="/admin" active={router.pathname === '/admin'}>Dashboard</Nav.Link>
              <Nav.Link href="/admin/users" active={router.pathname === '/admin/users'}>Users</Nav.Link>
              <Nav.Link href="/admin/events" active={router.pathname === '/admin/events'}>Events</Nav.Link>
              <Nav.Link href="/admin/settings" active={router.pathname === '/admin/settings'}>Settings</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link onClick={() => {
                localStorage.removeItem('jwt');
                localStorage.removeItem('userId');
                localStorage.removeItem('userEmail');
                router.push('/admin/login');
              }}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-4">
        {children}
      </Container>
    </div>
  );
};

export default AdminLayout;
