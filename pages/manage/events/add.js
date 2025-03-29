import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col, Alert, Container } from 'react-bootstrap';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { API_URL } from '../../../config';
import EventHeader from '../../../components/manage/EventHeader';

const AddEvent = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      router.push('/login');
      return;
    }
  }, []);

  const initialState = {
    name: '',
    date: new Date(),
    time: new Date().toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }) + '.000',
    description: '',
    location: '',
    locationGPS: '',
    banner: null,
    bannerPreview: '',
    price: '',
    tickets: '',
    sportType: '',
    event_organiser: '',
    organizer: '',
    status: "Inactive",
    categories: [],
    gstEnabled: false,
    gstSource: 'end_user',
    platformFeesEnabled: false,
    platformFeesSource: 'end_user',
    tshirtEnabled: false,
    tshirtSizes: '',
    dobFlag: false,
    termsFlag: false,
    termsText: ''
  };

  const [eventData, setEventData] = useState(initialState);
  const [newCategory, setNewCategory] = useState({
    name: '',
    price: '',
    description: ''
  });

  const [editingCategoryId, setEditingCategoryId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const resetForm = () => {
    setEventData(initialState);
    setNewCategory({ name: '', price: '', description: '' });
    setEditingCategoryId(null);
    // Clear the file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEventData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'name' ? { slug: value.toLowerCase().replace(/\s+/g, '-') } : {})
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEventData(prev => ({
        ...prev,
        banner: file,
        bannerPreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    
    // Only validate if there are no existing categories
    if (eventData.categories.length === 0 && (!newCategory.name || !newCategory.price || !newCategory.description)) {
      setError('Please fill in all category fields');
      return;
    }

    if (editingCategoryId) {
      // Update existing category in UI only
      setEventData(prev => ({
        ...prev,
        categories: prev.categories.map(cat =>
          cat.id === editingCategoryId 
            ? {
                id: cat.id,
                event_catagory: newCategory.name,
                price: newCategory.price,
                event_catagory_desc: newCategory.description
              }
            : cat
        )
      }));
    } else if (newCategory.name && newCategory.price && newCategory.description) {
      // Add new category to UI only
      const newCategoryData = {
        id: Date.now(), // Temporary ID for UI purposes
        event_catagory: newCategory.name,
        price: newCategory.price,
        event_catagory_desc: newCategory.description
      };

      setEventData(prev => ({
        ...prev,
        categories: [...prev.categories, newCategoryData]
      }));
    }

    // Clear the category form
    setNewCategory({
      name: '',
      price: '',
      description: ''
    });
    setEditingCategoryId(null);
    setError('');
  };

  const handleEditCategory = (category) => {
    setNewCategory({
      name: category.event_catagory,
      price: category.price,
      description: category.event_catagory_desc
    });
    setEditingCategoryId(category.id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Check if at least one category exists
    if (eventData.categories.length === 0) {
      setError('Please add at least one category for the event');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('jwt');
      const formData = new FormData();
      
      // Format date and time
      const formattedDate = new Date(eventData.date).toISOString().split('T')[0];
      // Ensure time is in correct format
      const formattedTime = eventData.time.length === 8 ? `${eventData.time}.000` : eventData.time;
      
      // Prepare the data object
      const dataToSend = {
        data: {
          ...eventData,
          date: formattedDate,
          time: formattedTime,
          // Map locationGPS to location_GPS
          location_GPS: eventData.locationGPS,
          locationGPS: undefined,
          // Ensure these fields are properly named
          tickets: eventData.tickets,
          organizer: eventData.organizer,
          // Remove unused fields
          dateTime: undefined,
          bannerPreview: undefined,
          // Ensure slug is properly formatted
          slug: eventData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
          status: "Inactive",
          // Rename categories to event_catagories for API
          event_catagories: eventData.categories.map(cat => ({
            event_catagory: cat.event_catagory,
            price: cat.price,
            event_catagory_desc: cat.event_catagory_desc
          })),
          categories: undefined
        }
      };

      // Add all event data except files to the data field
      formData.append('data', JSON.stringify(dataToSend.data));
      
      // Add the banner file separately if it exists
      if (eventData.banner) {
        formData.append('files.image', eventData.banner, eventData.banner.name);
      }

      const response = await fetch(`${API_URL}/api/events`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create event');
      }

      const data = await response.json();
      setSuccess('Event created successfully!');
      resetForm();
    } catch (err) {
      setError(err.message || 'Something went wrong while creating the event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <EventHeader />
      <Container>
        <div className="px-4">
          <Form onSubmit={handleSubmit}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Add New Event</h2>
              <Button variant="secondary" onClick={() => router.back()}>Back</Button>
            </div>

            <Row>
              <Col md={8}>
                {error && (
                  <Alert variant="danger" className="mb-3">
                    {error}
                  </Alert>
                )}
                {success && (
                  <Alert variant="success" className="mb-3">
                    {success}
                  </Alert>
                )}
                <Card className="mb-4">
                  <Card.Body>
                    <Form.Group className="mb-3">
                      <Form.Label>Event Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={eventData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Date *</Form.Label>
                      <DatePicker
                        selected={eventData.date}
                        onChange={(date) => setEventData(prev => ({ ...prev, date: date }))}
                        className="form-control"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Time *</Form.Label>
                      <Form.Control
                        type="time"
                        step="1"
                        value={eventData.time.split('.')[0]}
                        onChange={(e) => {
                          const timeValue = e.target.value;
                          setEventData(prev => ({ 
                            ...prev, 
                            time: `${timeValue}:00.000`
                          }));
                        }}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Description *</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={eventData.description}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Location *</Form.Label>
                          <Form.Control
                            type="text"
                            name="location"
                            value={eventData.location}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Location GPS *</Form.Label>
                          <Form.Control
                            type="text"
                            name="locationGPS"
                            value={eventData.locationGPS}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Event Banner *</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        required
                      />
                    </Form.Group>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Event Price *</Form.Label>
                          <Form.Control
                            type="number"
                            name="price"
                            value={eventData.price}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Tickets *</Form.Label>
                          <Form.Control
                            type="number"
                            name="tickets"
                            value={eventData.tickets}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Sport Type *</Form.Label>
                      <Form.Select
                        name="sportType"
                        value={eventData.sportType}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Sport Type</option>
                        <option value="Running">Running</option>
                        <option value="Cycling">Cycling</option>
                        <option value="Swimming">Swimming</option>
                        <option value="Trekking">Trekking</option>
                        <option value="Other">Other</option>
                      </Form.Select>
                    </Form.Group>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Event Organizer Email *</Form.Label>
                          <Form.Control
                            type="email"
                            name="event_organiser"
                            value={eventData.event_organiser}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Organizer *</Form.Label>
                          <Form.Control
                            type="text"
                            name="organizer"
                            value={eventData.organizer}
                            onChange={handleInputChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Status</Form.Label>
                      <Form.Control
                        type="text"
                        value="Draft"
                        disabled
                      />
                      <Form.Text className="text-muted">
                        New events are always created in Draft status
                      </Form.Text>
                    </Form.Group>
                  </Card.Body>
                </Card>

                <Card className="mb-4">
                  <Card.Body>
                    <h4>Categories</h4>
                    <Row className="mb-3">
                      <Col md={4}>
                        <Form.Group className="mb-2">
                          <Form.Label>Category Name *</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Category Name"
                            value={newCategory.name}
                            onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-2">
                          <Form.Label>Price *</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Price"
                            value={newCategory.price}
                            onChange={(e) => setNewCategory(prev => ({ ...prev, price: e.target.value }))}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Button 
                          onClick={handleAddCategory} 
                          variant={editingCategoryId ? "warning" : "success"}
                          className="mt-4"
                        >
                          {editingCategoryId ? "Update" : "Add"}
                        </Button>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={12}>
                        <Form.Group>
                          <Form.Label>Description *</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={2}
                            placeholder="Category Description"
                            value={newCategory.description}
                            onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <div className="mt-4">
                      <h5>Current Categories</h5>
                      {eventData.categories.map(category => (
                        <div key={category.id} className="d-flex justify-content-between align-items-start mb-2 p-2 border rounded">
                          <div>
                            <div className="fw-bold">{category.event_catagory} - ₹{category.price}</div>
                            <div className="text-muted small">{category.event_catagory_desc}</div>
                          </div>
                          <div>
                            <Button 
                              variant="link" 
                              className="p-0 me-2"
                              onClick={() => handleEditCategory(category)}
                            >
                              Edit
                            </Button>
                            <Button 
                              variant="link" 
                              className="p-0 text-danger"
                              onClick={() => {
                                setEventData(prev => ({
                                  ...prev,
                                  categories: prev.categories.filter(cat => cat.id !== category.id)
                                }));
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card.Body>
                </Card>

                <Card className="mb-4">
                  <Card.Body>
                    <h4>Additional Settings</h4>
                    
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        label="GST"
                        name="gstEnabled"
                        checked={eventData.gstEnabled}
                        onChange={handleInputChange}
                      />
                      {eventData.gstEnabled && (
                        <Form.Select
                          name="gstSource"
                          value={eventData.gstSource}
                          onChange={handleInputChange}
                          className="mt-2"
                        >
                          <option value="end_user">End User</option>
                          <option value="event_organiser">Event Organiser</option>
                        </Form.Select>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        label="Platform Fees"
                        name="platformFeesEnabled"
                        checked={eventData.platformFeesEnabled}
                        onChange={handleInputChange}
                      />
                      {eventData.platformFeesEnabled && (
                        <Form.Select
                          name="platformFeesSource"
                          value={eventData.platformFeesSource}
                          onChange={handleInputChange}
                          className="mt-2"
                        >
                          <option value="end_user">End User</option>
                          <option value="event_organiser">Event Organiser</option>
                        </Form.Select>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        label="T-shirt"
                        name="tshirtEnabled"
                        checked={eventData.tshirtEnabled}
                        onChange={handleInputChange}
                      />
                      {eventData.tshirtEnabled && (
                        <Form.Control
                          type="text"
                          placeholder="T-shirt sizes (comma separated)"
                          name="tshirtSizes"
                          value={eventData.tshirtSizes}
                          onChange={handleInputChange}
                          className="mt-2"
                        />
                      )}
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        label="Require Date of Birth"
                        name="dobFlag"
                        checked={eventData.dobFlag}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Check
                        type="switch"
                        label="Terms and Conditions"
                        name="termsFlag"
                        checked={eventData.termsFlag}
                        onChange={handleInputChange}
                      />
                      {eventData.termsFlag && (
                        <Form.Control
                          as="textarea"
                          rows={3}
                          placeholder="Enter terms and conditions"
                          name="termsText"
                          value={eventData.termsText}
                          onChange={handleInputChange}
                          className="mt-2"
                        />
                      )}
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card className="mb-4">
                  <Card.Body>
                    <h4>Event Banner Preview</h4>
                    {eventData.bannerPreview ? (
                      <img
                        src={eventData.bannerPreview}
                        alt="Event banner preview"
                        className="img-fluid mt-2"
                      />
                    ) : (
                      <div className="text-center p-4 bg-light">
                        No image uploaded
                      </div>
                    )}
                  </Card.Body>
                </Card>

                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg" 
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? 'Creating Event...' : 'Create Event'}
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default AddEvent;
