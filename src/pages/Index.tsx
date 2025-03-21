
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ExpertGrid from '@/components/ExpertGrid';
import FeaturesSection from '@/components/FeaturesSection';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <ExpertGrid />
        <FeaturesSection />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
