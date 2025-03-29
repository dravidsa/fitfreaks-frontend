import React, { useState } from "react";
import { Form, Modal, Button, Alert } from "react-bootstrap";
import { API_URL } from "../config";

const JoinUs = () => {
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ show: false, message: '', variant: 'success' });
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    interest: '',
    expertise: [],
    email: '',
    mobile: '',
    address: ''
  });

  const handleClose = () => {
    setShowJoinForm(false);
    setSubmitStatus({ show: false, message: '', variant: 'success' });
  };

  const handleShow = () => setShowJoinForm(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleExpertiseChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      expertise: checked 
        ? [...prev.expertise, value]
        : prev.expertise.filter(item => item !== value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ show: false, message: '', variant: 'success' });

    try {
      const response = await fetch(`${API_URL}/api/fitfreaks-users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            name: formData.name,
            city: formData.city,
            interest: formData.interest,
            expertise: formData.expertise.join(', '), // Convert array to comma-separated string
            email: formData.email,
            mobile: formData.mobile,
            address: formData.address
          }
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          show: true,
          message: 'Successfully registered! We will contact you soon.',
          variant: 'success'
        });
        // Reset form after successful submission
        setFormData({
          name: '',
          city: '',
          interest: '',
          expertise: [],
          email: '',
          mobile: '',
          address: ''
        });
        setTimeout(handleClose, 3000); // Close modal after 3 seconds
      } else {
        throw new Error(data.error?.message || 'Failed to register');
      }
    } catch (error) {
      console.log("error is ", JSON.stringify(error));
      setSubmitStatus({
        show: true,
        message: `Error: ${error.message}`,
        variant: 'danger'
      });
    }
  };

  return (
    <div className="join-us-section section-padding">
      <div className="container">
        <div className="join-us-block">
          <div className="text-center mb-4">
            <h2>Join Us</h2>
            <p>Join us if you want to advertise your services as Coach, Merchant or want to show your event on FitFreaks.in</p>
            <Button variant="primary" onClick={handleShow}>
              Join
            </Button>
          </div>
        </div>
      </div>

      <Modal show={showJoinForm} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Join FitFreaks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {submitStatus.show && (
            <Alert variant={submitStatus.variant} className="mb-3">
              {submitStatus.message}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Your interest in Fitfreaks</Form.Label>
              <Form.Select
                name="interest"
                value={formData.interest}
                onChange={handleInputChange}
                required
              >
                <option value="">Select your interest</option>
                <option value="Event Organizer">Event Organizer</option>
                <option value="Coach">Coach</option>
                <option value="Merchant">Merchant</option>
                <option value="Group admin">Group admin</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Your expertise</Form.Label>
              <div>
                {['Running', 'Cycling', 'Swimming', 'Trekking', 'Gym', 'Dietician', 'Yoga', 'Other'].map((expertise) => (
                  <Form.Check
                    key={expertise}
                    inline
                    type="checkbox"
                    label={expertise}
                    value={expertise}
                    checked={formData.expertise.includes(expertise)}
                    onChange={handleExpertiseChange}
                  />
                ))}
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mobile no</Form.Label>
              <Form.Control
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <style jsx>{`
        .join-us-block {
          background-color: #f8f9fa;
          border: 2px solid #dee2e6;
          border-radius: 10px;
          padding: 40px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .join-us-block h2 {
          color: #333;
          margin-bottom: 20px;
        }
        
        .join-us-block p {
          color: #666;
          margin-bottom: 30px;
        }
      `}</style>
    </div>
  );
};

export default JoinUs;
