import { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

const EventHeader = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({});
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const username = localStorage.getItem('username');
    const userRole = localStorage.getItem('userRole');
    if (username) {
      setUserInfo({ username });
      setUserRole(userRole || '');
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jwt');
      localStorage.removeItem('userInfo');
      localStorage.removeItem('userRole');
      localStorage.removeItem('username');
      router.push('/');
    }
  };

  return (
    <Navbar bg="dark" variant="dark" className="mb-4">
      <Container>
        <Navbar.Brand>Event Management</Navbar.Brand>
        {userInfo.username && (
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Item className="text-light me-3 d-flex align-items-center">
                Welcome, {userInfo.username} ({userRole})
              </Nav.Item>
              <Button variant="outline-light" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
};

export default EventHeader;
