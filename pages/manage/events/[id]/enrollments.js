import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Alert } from 'react-bootstrap';
import { useRouter } from 'next/router';
import ManageLayout from '../../../../components/manage/ManageLayout';
import { API_URL } from '../../../../config';

const EventEnrollments = () => {
  const router = useRouter();
  const { id } = router.query;
  const [enrollments, setEnrollments] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [emailSettings, setEmailSettings] = useState({
    enabled: false,
    email: ''
  });

  useEffect(() => {
    if (id) {
      fetchEnrollments();
    
    }
  }, [id]);

  const fetchEnrollments = async () => {
    try {
      const token = localStorage.getItem('jwt');
      const response = await fetch(`${API_URL}/api/event-enrollments?filters[event_id]=${id}&populate=*`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch enrollments');
      }

      const data = await response.json();
      setEnrollments(data.data || []);
    } catch (error) {
      setError(error.message);
    }
  };


  const handleDownloadCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Category', 'Enrollment Date'];
    const csvData = enrollments.map(enrollment => [
      enrollment.attributes.full_name,
      enrollment.attributes.email,
      enrollment.attributes.mobile,
      enrollment.attributes.event_catagory,
      new Date(enrollment.attributes.createdAt).toLocaleDateString()
    ]);
  
    let csvContent = headers.join(',') + '\n';
    csvData.forEach(row => {
      csvContent += row.join(',') + '\n';
    });
  
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'enrollments.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  

  const handleEmailSettingsSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('jwt');
      const response = await fetch(`${API_URL}/api/events/${id}/email-settings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(emailSettings)
      });

      if (!response.ok) {
        throw new Error('Failed to update email settings');
      }

      setSuccess('Email settings updated successfully');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Event Enrollments</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <div className="mb-4">
        <Button variant="primary" onClick={handleDownloadCSV} className="me-2">
          Download CSV
        </Button>
        <Button variant="secondary" onClick={() => router.back()}>
          Back
        </Button>
      </div>

   

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Category</th>
            <th>Enrollment Date</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map((enrollment) => (
            <tr key={enrollment.id}>
              <td>{enrollment.attributes.full_name}</td>
              <td>{enrollment.attributes.email}</td>
              <td>{enrollment.attributes.mobile}</td>
              <td>{enrollment.attributes.event_catagory}</td>
              <td>{new Date(enrollment.attributes.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

EventEnrollments.getLayout = (page) => <ManageLayout>{page}</ManageLayout>;

export default EventEnrollments;
