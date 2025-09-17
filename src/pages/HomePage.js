import React from 'react';
import HeroSection from '../components/HeroSection.js'; // Updated import
import AboutUsSection from '../components/AboutUsSection.js'; // Updated import
import GoalMissionVisionSection from '../components/GoalMissionVisionSection.js'; // Updated import
import PartnersSection from '../components/PartnersSection.js'; // Updated import
import FaqSection from '../components/FaqSection.js'; // Updated import

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <AboutUsSection />
      <GoalMissionVisionSection />
      <PartnersSection />
      <FaqSection />
    </>
  );
};

export default HomePage;
