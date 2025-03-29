import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import AdminLayout from '../../components/admin/AdminLayout';
import { API_URL } from '../../config';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ show: false, message: '', variant: 'success' });

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('jwt');
      const response = await fetch(`${API_URL}/api/fitfreaks-users?populate=*`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      setUsers(data.data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserAction = async (userId, action) => {
    try {
      const token = localStorage.getItem('jwt');
      const response = await fetch(`${API_URL}/api/fitfreaks-users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          data: {
            status: action
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update user status');
      }

      setSubmitStatus({
        show: true,
        message: `User successfully ${action}`,
        variant: 'success'
      });

      // Refresh users list
      fetchUsers();
      
      // Close modal after 2 seconds
      setTimeout(() => {
        setShowUserModal(false);
        setSubmitStatus({ show: false, message: '', variant: 'success' });
      }, 2000);
    } catch (error) {
      setSubmitStatus({
        show: true,
        message: `Error: ${error.message}`,
        variant: 'danger'
      });
    }
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  return (
    <AdminLayout>
      <h2 className="mb-4">Users Management</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>City</th>
            <th>Interest</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.attributes.name}</td>
              <td>{user.attributes.email}</td>
              <td>{user.attributes.city}</td>
              <td>{user.attributes.interest}</td>
              <td>{user.attributes.status || 'Pending'}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => handleViewUser(user)}
                  className="me-2"
                >
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showUserModal} onHide={() => setShowUserModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {submitStatus.show && (
            <Alert variant={submitStatus.variant} className="mb-3">
              {submitStatus.message}
            </Alert>
          )}
          {selectedUser && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedUser.attributes.name}
                  readOnly
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedUser.attributes.city}
                  readOnly
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Interest in Fitfreaks</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedUser.attributes.interest}
                  readOnly
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Expertise</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedUser.attributes.expertise}
                  readOnly
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={selectedUser.attributes.email}
                  readOnly
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Mobile no</Form.Label>
                <Form.Control
                  type="tel"
                  value={selectedUser.attributes.mobile}
                  readOnly
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={selectedUser.attributes.address}
                  readOnly
                />
              </Form.Group>

              <div className="d-flex justify-content-end gap-2">
                <Button
                  variant="success"
                  onClick={() => handleUserAction(selectedUser.id, 'approved')}
                >
                  Approve
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleUserAction(selectedUser.id, 'rejected')}
                >
                  Reject
                </Button>
              </div>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </AdminLayout>
  );
};

export default Users;
