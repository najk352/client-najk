import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminDashboardPage = () => {
  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Admin Dashboard</h1>
      <Row className="justify-content-center">
        <Col md={4} className="mb-4">
          <Card className="shadow-sm text-center">
            <Card.Body>
              <Card.Title>Manage Jobs</Card.Title>
              <Card.Text>Create, edit, or delete job postings.</Card.Text>
              <Button as={Link} to="/admin/jobs" variant="primary">Go to Job Management</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="shadow-sm text-center">
            <Card.Body>
              <Card.Title>Manage Applications</Card.Title>
              <Card.Text>View and update job applications.</Card.Text>
              <Button as={Link} to="/admin/applications" variant="primary">Go to Applications</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4"> {/* <--- NEW CARD */}
          <Card className="shadow-sm text-center">
            <Card.Body>
              <Card.Title>Contact Messages</Card.Title>
              <Card.Text>Review messages from the 'Contact Us' form.</Card.Text>
              <Button as={Link} to="/admin/contact-messages" variant="primary">View Messages</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboardPage;