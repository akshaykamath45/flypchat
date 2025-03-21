
import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const Hero = () => {
  const elementsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      elementsRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const scrollToExperts = () => {
    const expertsSection = document.getElementById('experts');
    expertsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-16 pb-24 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-white -z-10" />
      
      {/* Abstract shapes */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-flyp-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" />
      <div className="absolute bottom-20 -left-20 w-80 h-80 bg-flyp-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="container mx-auto px-6 md:px-12 relative">
        <div className="max-w-4xl mx-auto text-center">
          <span 
            ref={(el) => (elementsRef.current[0] = el)}
            className="inline-block bg-flyp-100 text-flyp-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6 opacity-0"
            style={{ '--delay': 1 } as React.CSSProperties}
          >
            Trusted Expert Consultations
          </span>
          
          <h1 
            ref={(el) => (elementsRef.current[1] = el)}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6 opacity-0"
            style={{ '--delay': 2 } as React.CSSProperties}
          >
            Expert Advice You <span className="text-flyp">Can Trust</span>
          </h1>
          
          <p 
            ref={(el) => (elementsRef.current[2] = el)}
            className="text-xl md:text-2xl text-gray-600 mb-10 opacity-0"
            style={{ '--delay': 3 } as React.CSSProperties}
          >
            Connect with verified experts in finance, real estate, career development, and more for personalized guidance.
          </p>
          
          <div 
            ref={(el) => (elementsRef.current[3] = el)}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0"
            style={{ '--delay': 4 } as React.CSSProperties}
          >
            <button 
              className={cn(
                "relative group btn-primary min-w-[200px]",
                "before:absolute before:-inset-0.5 before:bg-gradient-to-r before:from-flyp before:to-flyp-400",
                "before:rounded-full before:blur before:opacity-70 before:group-hover:opacity-100 before:transition before:duration-1000",
                "hover:scale-[1.02]"
              )}
              onClick={scrollToExperts}
            >
              <span className="relative">Find My Expert</span>
            </button>
            
            <button 
              className="btn-secondary hover:bg-gray-100 min-w-[200px]"
              onClick={() => window.open('#', '_blank')}
            >
              How It Works
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce" onClick={scrollToExperts}>
          <ChevronDown size={32} className="text-flyp" />
        </div>
      </div>
      
      {/* Statistics */}
      <div 
        ref={(el) => (elementsRef.current[4] = el)}
        className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm py-6 opacity-0"
        style={{ '--delay': 5 } as React.CSSProperties}
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center md:justify-around items-center gap-8 md:gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-flyp">500+</p>
              <p className="text-gray-600">Verified Experts</p>
            </div>
            <div className="hidden md:block w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <p className="text-3xl font-bold text-flyp">98%</p>
              <p className="text-gray-600">Client Satisfaction</p>
            </div>
            <div className="hidden md:block w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <p className="text-3xl font-bold text-flyp">25K+</p>
              <p className="text-gray-600">Consultations</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
