import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import najahLogo from '../assets/najah_logo.png'; // Import your logo

const HeroSection = () => {
  return (
    <div className="hero-section">
      <Container>
        <img
          src={najahLogo}
          alt="Najah Global Hub Consultancy Logo"
          height="100"
          className="mb-4"
        />
        <h1 className="display-4 fw-bold mb-4">Your Dream Career Awaits</h1>
        <p className="lead mb-4">
          Connect with global roles across diverse sectors.
        </p>
        <Button as={Link} to="/apply" variant="primary" size="lg">
          Apply Now
        </Button>
      </Container>
    </div>
  );
};

export default HeroSection;