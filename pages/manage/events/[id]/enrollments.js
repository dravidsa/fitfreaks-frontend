import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Alert } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Layout from '@/components/global/layout';
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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (id) {
      fetchEnrollments(1, searchTerm);
    }
  }, [id]);

  const fetchEnrollments = async (page = 1, search = "") => {
    try {
      const token = localStorage.getItem('jwt');
      let url = `${API_URL}/api/event-enrollments?filters[event_id]=${id}&populate=*`;
      if (search) {
        url += `&filters[full_name][$containsi]=${encodeURIComponent(search)}`;
      }
      url += `&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch enrollments');
      }
      const data = await response.json();
      setEnrollments(data.data || []);
      setTotalPages(data.meta?.pagination?.pageCount || 1);
      setCurrentPage(data.meta?.pagination?.page || 1);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchEnrollments(1, searchTerm);
  };

  const handlePageChange = (newPage) => {
    fetchEnrollments(newPage, searchTerm);
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
    <Layout title="Event Enrollments">
      <div style={{ marginTop: '2rem', marginLeft: 'auto', marginRight: 'auto', maxWidth: 900, paddingLeft: 24, paddingRight: 24 }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Event Enrollments</h2>
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
        <Form className="mb-3" onSubmit={handleSearch}>
          <Form.Group controlId="searchName">
            <Form.Label>Search by Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name to search..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="info" className="mt-2">Search</Button>
        </Form>
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
        <div className="d-flex justify-content-between align-items-center mt-3">
          <Button
            variant="secondary"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </Button>
          <span>Page {currentPage} of {totalPages}</span>
          <Button
            variant="secondary"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default EventEnrollments;
