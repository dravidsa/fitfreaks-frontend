import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { useRouter } from 'next/router';

const AppointmentBooking = () => {
  const [date, setDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const router = useRouter();
  const { coachId } = router.query;

  useEffect(() => {
    if (coachId && date) {
      fetchAvailableSlots();
    }
  }, [coachId, date]);

  const fetchAvailableSlots = async () => {
    try {
      const response = await axios.get(`/api/appointments/available-slots`, {
        params: {
          coachId,
          date: date.toISOString().split('T')[0]
        }
      });
      setAvailableSlots(response.data.slots);
    } catch (error) {
      console.error('Error fetching slots:', error);
    }
  };

  const handleBookAppointment = async () => {
    try {
      await axios.post('/api/appointments/book', {
        coachId,
        date: date.toISOString().split('T')[0],
        slot: selectedSlot
      });
      alert('Appointment booked successfully!');
      router.push('/appointments/my-appointments');
    } catch (error) {
      alert('Failed to book appointment');
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <h2>Book an Appointment</h2>
          <div className="calendar-container mt-4">
            <Calendar
              onChange={setDate}
              value={date}
              minDate={new Date()}
              className="react-calendar"
            />
          </div>
        </Col>
        <Col md={6}>
          <h3>Available Slots for {date.toDateString()}</h3>
          <div className="time-slots mt-4">
            {availableSlots.map((slot, index) => (
              <Button
                key={index}
                variant={selectedSlot === slot ? "primary" : "outline-primary"}
                className="m-2"
                onClick={() => setSelectedSlot(slot)}
              >
                {slot}
              </Button>
            ))}
          </div>
          {selectedSlot && (
            <Button
              variant="success"
              className="mt-4"
              onClick={handleBookAppointment}
            >
              Confirm Booking
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AppointmentBooking;
