import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const AboutUsSection = () => {
  return (
    <div className="about-section">
      <Container>
        <h2 className="text-center mb-4">About Najah Global Hub Consultancy</h2>
        <Row className="justify-content-center">
          <Col md={8}>
            <p className="lead text-center">
              Najah Global Hub Consultancy is a leading international consultancy committed to connecting professionals with global roles across various sectors. We offer full support—from application to placement—including visa processing, relocation logistics, and onboarding assistance. Our goal is to empower individuals to achieve their career aspirations abroad with confidence and dignity.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutUsSection;