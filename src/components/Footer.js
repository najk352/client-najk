import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="footer bg-light mt-auto py-3">
      <Container>
        <Row>
          <Col md={12} className="text-center">
            <p className="text-muted mb-0">&copy; 2025 Najah Global Hub Consultancy</p>
            <p className="text-muted mt-1">
              <a href="/privacy" className="text-muted me-2">Privacy Policy</a> | 
              <a href="/terms" className="text-muted ms-2">Terms and Conditions</a>
            </p>
            {/* Add decorative or branding images/icons here if needed */}
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;