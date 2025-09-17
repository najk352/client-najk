import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import transguardLogo from '../assets/transguard_group_logo.png';
import aramcoLogo from '../assets/aramco_logo.png';

const PartnersSection = () => {
  return (
    <div className="partners-section">
      <Container>
        <h2 className="text-center mb-5">Our Valued Partners</h2>
        <Row className="justify-content-center align-items-center">
          <Col md={4} className="text-center mb-4">
            <img src={transguardLogo} alt="Transguard Group Logo" className="img-fluid" style={{ maxHeight: '100px' }} />
          </Col>
          <Col md={4} className="text-center mb-4">
            <img src={aramcoLogo} alt="Aramco Logo" className="img-fluid" style={{ maxHeight: '80px' }} />
          </Col>
          {/* Add more partner logos as needed */}
        </Row>
      </Container>
    </div>
  );
};

export default PartnersSection;