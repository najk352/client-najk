import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import FaqSection from '../components/FaqSection.js'; // Updated import

const ServicesPage = () => {
  return (
    <>
      <Container className="py-5">
        <h1 className="text-center mb-5">Our Services</h1>
        <Row className="justify-content-center">
          <Col md={6} lg={4} className="mb-4">
            <Card className="h-100 shadow-sm text-center">
              <Card.Body>
                <Card.Title>Global Recruitment</Card.Title>
                <Card.Text>
                  Connecting skilled professionals with diverse job opportunities across various industries worldwide.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4} className="mb-4">
            <Card className="h-100 shadow-sm text-center">
              <Card.Body>
                <Card.Title>Visa Processing Assistance</Card.Title>
                <Card.Text>
                  Guidance and support throughout the visa application process to ensure a smooth transition.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4} className="mb-4">
            <Card className="h-100 shadow-sm text-center">
              <Card.Body>
                <Card.Title>Relocation Logistics</Card.Title>
                <Card.Text>
                  Assistance with travel arrangements, accommodation, and initial settling-in at your new destination.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4} className="mb-4">
            <Card className="h-100 shadow-sm text-center">
              <Card.Body>
                <Card.Title>Pre-departure Orientation</Card.Title>
                <Card.Text>
                  Essential training and information sessions to prepare you for your new role and cultural environment.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4} className="mb-4">
            <Card className="h-100 shadow-sm text-center">
              <Card.Body>
                <Card.Title>Post-placement Support</Card.Title>
                <Card.Text>
                  Ongoing assistance to ensure your successful integration and satisfaction in your new role.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <FaqSection />
    </>
  );
};

export default ServicesPage;