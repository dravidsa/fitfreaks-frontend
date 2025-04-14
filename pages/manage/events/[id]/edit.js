import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button, Card, Row, Col, Alert, Container } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import EventHeader from '../../../../components/manage/EventHeader';
import { API_URL } from '../../../../config';

const EditEvent = () => {
  const router = useRouter();
  const { id } = router.query;
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [eventData, setEventData] = useState({
    name: '',
    date: new Date(),
    time: new Date().toTimeString().slice(0, 5),
    description: '',
    location: '',
    locationGPS: '',
    banner: null,
    bannerPreview: null,
    price: '',
    tickets: '',
    sportType: '',
    event_organiser: '',
    organizer: '',
    status: 'Inactive',
    categories: [],
    gstEnabled: false,
    platformFeesEnabled: false,
    tshirtEnabled: false,
    dobFlag: false,
    termsFlag: false,
    gstSource: 'end_user',
    platformFeesSource: 'end_user',
    tshirtSizes: '',
    termsText: ''
  });

  const [originalEventData, setOriginalEventData] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: '',
    price: '',
    description: ''
  });

  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      router.push('/login');
      return;
    }

    // Get user info from localStorage
    const username = localStorage.getItem('username');
    const userEmail = localStorage.getItem('userEmail');
    const userRole = localStorage.getItem('userRole');
    
    if (username && userEmail) {
      setUserInfo({
        username: username,
        email: userEmail
      });
      setUserRole(userRole || 'user');
    }

    if (id) {
      fetchEvent();
    }
  }, [id]);

  const fetchEvent = async () => {
    try {
      const token = localStorage.getItem('jwt');
      const response = await fetch(`${API_URL}/api/events/${id}?populate=*`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch event');
      }

      const data = await response.json();
      console.log('Fetched event data:', data); // Debug log
      const event = data.data.attributes;
      
      // Store the original data for reference
      const originalEventData = data.data;
      
      // Get banner URL if it exists
      const bannerData = event.banner?.data;
      const bannerUrl = bannerData?.attributes?.url;
      
      console.log('Banner URL:', bannerUrl); // Debug log
      
      // Convert date and time
      const eventDate = event.date ? new Date(event.date) : new Date();
      
      setEventData({
        ...event,
        date: eventDate,
        time: event.time || new Date().toTimeString().slice(0, 5),
        bannerPreview: bannerUrl ? `${API_URL}${bannerUrl}` : null,
        categories: event.event_catagories || [],
        locationGPS: event.location_GPS || '',
        gstEnabled: event.gstEnabled || false,
        platformFeesEnabled: event.platformFeesEnabled || false,
        tshirtEnabled: event.tshirtEnabled || false,
        dobFlag: event.dobFlag || false,
        termsFlag: event.termsFlag || false,
        gstSource: event.gstSource || 'end_user',
        platformFeesSource: event.platformFeesSource || 'end_user',
        tshirtSizes: event.tshirtSizes || '',
        termsText: event.termsText || '',
        status: event.status || 'Inactive'
      });
    } catch (error) {
      console.error('Error fetching event:', error);
      setError('Failed to load event. ' + error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEventData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleBannerChange = (e) => {
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

  const deleteCategory = (categoryId) => {
    // Update local state only
    setEventData(prev => ({
      ...prev,
      categories: prev.categories.filter(cat => cat.id !== categoryId)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate date is not in the past
    const selectedDate = new Date(eventData.date);
    selectedDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      setError('Event date cannot be in the past');
      setLoading(false);
      return;
    }

    // Check if at least one category exists
    if (eventData.categories.length === 0) {
      setError('Please add at least one category for the event');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('jwt');

      // Create a copy of eventData with renamed fields
      const dataToSend = {
        data: {
          ...eventData,
          event_catagories: eventData.categories.map(cat => ({
            event_catagory: cat.event_catagory,
            price: cat.price,
            event_catagory_desc: cat.event_catagory_desc
          })),
          categories: undefined,
          location_GPS: eventData.locationGPS,
          locationGPS: undefined,
          banner: undefined,
          bannerPreview: undefined
        }
      };

      // If there's a new banner file, use FormData
      if (eventData.banner instanceof File) {
        const formData = new FormData();
        formData.append('files.banner', eventData.banner);
        formData.append('data', JSON.stringify(dataToSend.data));

        const response = await fetch(`${API_URL}/api/events/${id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || 'Failed to update event');
        }
      } else {
        // If no new banner, send JSON data
        const response = await fetch(`${API_URL}/api/events/${id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataToSend)
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || 'Failed to update event');
        }
      }

      router.push('/manage/events');
    } catch (error) {
      setError('Failed to update event. ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    router.push('/login');
  };

  return (
    <div>
      <EventHeader />
      <Container>
        <div className="px-4">
          <Form onSubmit={handleSubmit}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Edit Event</h2>
              <Button variant="secondary" onClick={() => router.back()}>Back</Button>
            </div>

            {error && <Alert variant="danger" className="mb-4">{error}</Alert>}

            <Row>
              <Col md={8}>
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
                      <Form.Control
                        type="date"
                        value={eventData.date.toISOString().split('T')[0]}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => {
                          const selectedDate = new Date(e.target.value);
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          
                          if (selectedDate < today) {
                            setError('Event date cannot be in the past');
                            return;
                          }
                          
                          setEventData(prev => ({ 
                            ...prev, 
                            date: selectedDate
                          }));
                          setError('');
                        }}
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
                      <Form.Label>Event Banner</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleBannerChange}
                      />
                      <Form.Text className="text-muted">
                        Leave empty to keep the current banner
                      </Form.Text>
                    </Form.Group>

                    {eventData.bannerPreview && (
                      <div className="mb-3">
                        <p>Current Banner:</p>
                        <div style={{ maxWidth: '300px' }}>
                          <img
                            src={eventData.bannerPreview}
                            alt="Event Banner"
                            style={{ width: '100%', height: 'auto' }}
                          />
                        </div>
                      </div>
                    )}

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
                          <Form.Label>Event Organiser Email *</Form.Label>
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
                          <Form.Label>Organizing Group *</Form.Label>
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

                    {userRole === 'platform_admin' && (
                      <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                          name="status"
                          value={eventData.status}
                          onChange={handleInputChange}
                        >
                          <option value="Inactive">Inactive</option>
                          <option value="Active">Active</option>
                        </Form.Select>
                      </Form.Group>
                    )}
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
                        {editingCategoryId && (
                          <Button 
                            onClick={() => {
                              setNewCategory({ name: '', price: '', description: '' });
                              setEditingCategoryId(null);
                            }}
                            variant="secondary"
                            className="mt-4 ms-2"
                          >
                            Cancel
                          </Button>
                        )}
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
                      {eventData.categories && eventData.categories.length > 0 ? (
                        eventData.categories.map(category => (
                          <div key={category.id} className="d-flex justify-content-between align-items-start mb-2 p-2 border rounded">
                            <div>
                              <div className="fw-bold">{category.event_catagory} - ₹{category.price}</div>
                              <div className="text-muted small">{category.event_catagory_desc}</div>
                            </div>
                            <div>
                              <Button 
                                variant="warning" 
                                size="sm" 
                                className="me-2"
                                onClick={() => handleEditCategory(category)}
                              >
                                Change
                              </Button>
                              <Button 
                                variant="danger" 
                                size="sm" 
                                onClick={() => deleteCategory(category.id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-muted">No categories added yet</div>
                      )}
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
                    <Card.Title>Event Banner</Card.Title>
                    {eventData.bannerPreview && (
                      <div className="mb-3">
                        <img 
                          src={eventData.bannerPreview} 
                          alt="Event banner preview" 
                          style={{ maxWidth: '100%', height: 'auto' }}
                        />
                      </div>
                    )}
                    <Form.Group>
                      <Form.Label>Upload Banner</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleBannerChange}
                      />
                    </Form.Group>
                  </Card.Body>
                </Card>

                <Button type="submit" variant="primary" size="lg" className="w-100" disabled={loading}>
                  {loading ? 'Updating...' : 'Update Event'}
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default EditEvent;
