import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaTwitter, FaComments, FaCalendarAlt } from 'react-icons/fa';
import styles from '@/styles/groups/GroupSections.module.css';
import { useRouter } from 'next/router';

const ContactSection = ({ contact, to_email = 'support@fitfreaks.in' }) => {
  const { address, phone, email, facebook, instagram, twitter } = contact;
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  async function sendMail(to_email,name, customer_email, message, subject, template) {
    const mailData = {
      name: name,
      customer_email: customer_email,
      subject: subject,
      template: template,
      query: message,
      to_email: to_email
    };
    console.log("Mail data = ", JSON.stringify(mailData));

    const data = await fetch("/api/sendMail", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mailData),
    }).then((t) => t.json());
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission logic

    sendMail(to_email,formData.name, formData.email, formData.message, formData.subject, "query");

    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChat = () => {
    // TODO: Implement chat functionality
    alert('Chat feature coming soon!');
  };

  const handleBookAppointment = () => {
    router.push('/appointments');
  };

  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.sectionTitle}>Contact Us</h2>
        <Row>
          <Col lg={4}>
            <div className={styles.contactInfo}>
              {address && (
                <div className={styles.contactItem}>
                  <FaMapMarkerAlt /> {address}
                </div>
              )}
              {phone && (
                <div className={styles.contactItem}>
                  <FaPhone /> {phone}
                </div>
              )}
              {email && (
                <div className={styles.contactItem}>
                  <FaEnvelope /> {email}
                </div>
              )}
              <div className={styles.socialLinks}>
                <h3>Connect With Us</h3>
                <div className={styles.socialIcons}>
                  {facebook && (
                    <a href={facebook} target="_blank" rel="noopener noreferrer">
                      <FaFacebook />
                    </a>
                  )}
                  {instagram && (
                    <a href={instagram} target="_blank" rel="noopener noreferrer">
                      <FaInstagram />
                    </a>
                  )}
                  {twitter && (
                    <a href={twitter} target="_blank" rel="noopener noreferrer">
                      <FaTwitter />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Col>
          <Col lg={4}>
            <div className={styles.contactForm}>
              <h3>Send us a Message</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Your Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Your Message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className={styles.submitButton}>
                  Send Message
                </Button>
              </Form>
            </div>
          </Col>
          <Col lg={4}>
            <div className={styles.actionButtons}>
              <h3>Quick Actions</h3>
              <Button 
                variant="outline-primary" 
                className={styles.actionButton}
                onClick={handleChat}
              >
                <FaComments /> Start Chat
              </Button>
              <Button 
                variant="outline-primary" 
                className={styles.actionButton}
                onClick={handleBookAppointment}
              >
                <FaCalendarAlt /> Book Appointment
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactSection;
