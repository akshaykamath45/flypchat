
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ExpertGrid from '@/components/ExpertGrid';
import FeaturesSection from '@/components/FeaturesSection';
import FAQ from '@/components/FAQ';
import BecomeExpert from '@/components/BecomeExpert';
import Footer from '@/components/Footer';
import { useEffect } from 'react';

const Index = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <ExpertGrid />
        <FeaturesSection />
        <FAQ />
        <BecomeExpert />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
