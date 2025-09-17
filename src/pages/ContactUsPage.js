// client/src/pages/ContactUsPage.js

import React, { useState } from 'react';
import { Container, Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import api from '../utils/api.js'; // Ensure this import is here

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState(null); // 'success', 'error', 'loading'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await api.post('/api/contact', formData); // <--- UNCOMMENT THIS
      if (response.status === 201) { // Expect 201 Created from backend
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error'); // Handle unexpected non-201 success codes
      }
    } catch (error) {
      setStatus('error');
      console.error('Contact form submission error:', error.response?.data?.message || error.message);
    } finally {
      // If you want the success message to disappear after a while:
      // setTimeout(() => setStatus(null), 5000);
      // setLoading(false); // No separate loading state here for form, status handles it
    }
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Contact Us</h1>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow p-4">
            <Card.Body>
              {status === 'success' && <Alert variant="success">Your message has been sent successfully!</Alert>}
              {status === 'error' && <Alert variant="danger">Failed to send your message. Please try again.</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="contactName">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="contactEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="contactSubject">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="contactMessage">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center mt-5">
        <Col md={8} lg={6}>
          <Card className="shadow p-4 text-center">
            <Card.Body>
              <h5>Other Ways to Reach Us</h5>
              <p className="mb-1"><strong>Address:</strong> [Your Company Address Here]</p>
              <p className="mb-1"><strong>Phone:</strong> +254 797 588 159</p>
              <p><strong>Email:</strong> info@najahglobalhub.com</p>
              {/* Add social media links/icons here if desired */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUsPage;