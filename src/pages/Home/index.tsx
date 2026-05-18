import React from 'react';
import { HeroSection } from '../../components/HeroSection';
import { SearchBar } from '../../components/SearchBar';
import { HowItWorks } from '../../components/HowItWorks';
import { Testimonials } from '../../components/Testimonials';
import { CTABanner } from '../../components/CTABanner';
import { Footer } from '../../components/Footer';

export const Home: React.FC = () => {
  return (
    <>
      <div className="w-full flex flex-col items-center">
        <HeroSection />
        <SearchBar />
        <HowItWorks />
        <Testimonials />
        <CTABanner />
      </div>
      <Footer />
    </>
  );
};
