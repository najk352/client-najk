import React from 'react';
import { Container } from 'react-bootstrap';
import AboutUsSection from '../components/AboutUsSection.js'; // Updated import
import GoalMissionVisionSection from '../components/GoalMissionVisionSection.js'; // Updated import
import FaqSection from '../components/FaqSection.js'; // Updated import

const AboutPage = () => {
  return (
    <>
      <AboutUsSection />
      <GoalMissionVisionSection />
      <Container className="py-5">
        <h2 className="text-center mb-4">Our Commitment</h2>
        <p className="lead text-center">
          At Najah Global Hub Consultancy, our commitment extends beyond mere placement. We foster long-term relationships, offering ongoing support and guidance to our candidates as they navigate their new professional journeys abroad. Our extensive network and deep industry insights allow us to match talent with opportunities that truly align with their aspirations and skills.
        </p>
        <p className="text-center">
          We believe in a world where talent knows no borders, and we are dedicated to making that vision a reality for every professional we serve.
        </p>
      </Container>
      <FaqSection />
    </>
  );
};

export default AboutPage;