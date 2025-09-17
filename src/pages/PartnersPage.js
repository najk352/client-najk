import React from 'react';
import { Container } from 'react-bootstrap';
import PartnersSection from '../components/PartnersSection.js'; // Updated import
import FaqSection from '../components/FaqSection.js'; // Updated import

const PartnersPage = () => {
  return (
    <>
      <PartnersSection />
      <Container className="py-5">
        <h2 className="text-center mb-4">Working Together for Global Opportunities</h2>
        <p className="lead text-center">
          Our strong partnerships are the cornerstone of our success. By collaborating with industry leaders and reputable organizations worldwide, we ensure access to an expansive network of opportunities and a seamless placement process for our candidates.
        </p>
        <p className="text-center">
          These alliances reflect our dedication to credibility, excellence, and providing the best possible outcomes for both talent and employers across the globe.
        </p>
      </Container>
      <FaqSection />
    </>
  );
};

export default PartnersPage;