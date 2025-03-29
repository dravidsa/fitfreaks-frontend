import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import ManageLayout from '../../components/manage/ManageLayout';

const ManageAppointments = () => {
  const [date, setDate] = useState(new Date());
  const [slots, setSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
  ];

  useEffect(() => {
    fetchSlots();
  }, [date]);

  const fetchSlots = async () => {
    try {
      const response = await axios.get('/api/appointments/coach-slots', {
        params: {
          date: date.toISOString().split('T')[0]
        }
      });
      setSlots(response.data.slots || []);
    } catch (error) {
      console.error('Error fetching slots:', error);
    }
  };

  const handleSlotToggle = (slot) => {
    setSelectedSlots(prev => 
      prev.includes(slot) 
        ? prev.filter(s => s !== slot)
        : [...prev, slot]
    );
  };

  const handleSaveAvailability = async () => {
    try {
      await axios.post('/api/appointments/update-availability', {
        date: date.toISOString().split('T')[0],
        slots: selectedSlots
      });
      alert('Availability updated successfully!');
      fetchSlots();
    } catch (error) {
      alert('Failed to update availability');
    }
  };

  return (
    <Container className="mt-5">
      <h2>Manage Your Availability</h2>
      <Row className="mt-4">
        <Col md={6}>
          <Calendar
            onChange={setDate}
            value={date}
            minDate={new Date()}
            className="react-calendar"
          />
        </Col>
        <Col md={6}>
          <h3>Set Available Slots for {date.toDateString()}</h3>
          <div className="time-slots mt-4">
            {timeSlots.map((slot) => (
              <Button
                key={slot}
                variant={selectedSlots.includes(slot) ? "primary" : "outline-primary"}
                className="m-2"
                onClick={() => handleSlotToggle(slot)}
              >
                {slot}
              </Button>
            ))}
          </div>
          <Button
            variant="success"
            className="mt-4"
            onClick={handleSaveAvailability}
          >
            Save Availability
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

ManageAppointments.getLayout = (page) => <ManageLayout>{page}</ManageLayout>;

export default ManageAppointments;
