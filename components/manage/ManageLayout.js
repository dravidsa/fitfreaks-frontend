import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { API_URL } from '../../config';

const ManageLayout = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('jwt');
      const userEmail = localStorage.getItem('userEmail');

      if (!token || !userEmail) {
        router.push('/login');
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/fitfreaks-users?filters[email]=${encodeURIComponent(userEmail)}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Authentication failed');
        }

        const userData = await response.json();
        const userRole = userData.data?.[0]?.attributes?.role;
        
        if (!userRole || !['platform_admin', 'event_organiser', 'merchant', 'coach'].includes(userRole)) {
          throw new Error('Unauthorized access');
        }

        setUserRole(userRole);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('jwt');
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        router.push('/login');
      }
    };

    checkAuth();
  }, []);

  if (!isAuthenticated) {
    return <div>Checking authentication...</div>;
  }

  return isAuthenticated ? (
    <>
      <Navbar bg="light" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="/manage">Management Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/manage">Dashboard</Nav.Link>
              {userRole === 'event_organiser' && (
                <Nav.Link href="/manage/events">Events</Nav.Link>
              )}
              {userRole === 'merchant' && (
                <Nav.Link href="/manage/products">Products</Nav.Link>
              )}
              {userRole === 'coach' && (
                <Nav.Link href="/manage/appointments">Appointments</Nav.Link>
              )}
            </Nav>
            <Nav>
              <Nav.Link onClick={() => {
                localStorage.removeItem('jwt');
                localStorage.removeItem('userId');
                localStorage.removeItem('userEmail');
                router.push('/login');
              }}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container style={{ marginLeft: '2rem', marginRight: '2rem', maxWidth: 'calc(100% - 4rem)' }}>
        {React.cloneElement(children, { userRole })}
      </Container>
    </>
  ) : null;
};

export default ManageLayout;
