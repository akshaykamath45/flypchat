
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

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-16 pb-24 overflow-hidden">
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
              onClick={() => scrollToSection('#experts')}
            >
              <span className="relative">Find My Expert</span>
            </button>
            
            <button 
              className="btn-secondary hover:bg-gray-100 min-w-[200px]"
              onClick={() => scrollToSection('#features')}
            >
              How It Works
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce" onClick={() => scrollToSection('#experts')}>
          <ChevronDown size={32} className="text-flyp" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
