import React from 'react';
import HeroSection from '../components/HeroSection';
import JourneySteps from '../components/JourneySteps';
import HowItWorks from '../components/HowItWorks';
import BentoGrid from '../components/BentoGrid';
import FinalCTA from '../components/FinalCTA';

const LandingPage = () => {
  return (
    <main>
      <HeroSection />
      <JourneySteps />
      <HowItWorks />
      <BentoGrid />
      <FinalCTA />
    </main>
  );
};

export default LandingPage;
