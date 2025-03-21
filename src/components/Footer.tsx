
import { useRef, useEffect } from 'react';
import { Mail, Phone, MessageSquare, ChevronRight, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (footerRef.current) {
            footerRef.current.classList.add('animate-fade-in');
            observer.unobserve(footerRef.current);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Handle scroll to section when hash changes
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const scrollToSection = (sectionId: string) => {
    const isHomePage = location.pathname === '/';
    
    if (!isHomePage) {
      // If not on home page, navigate to home page with hash
      const hash = sectionId.replace('#', '');
      window.location.href = `/${sectionId}`;
      return;
    }

    // If on home page, scroll to section
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8" ref={footerRef}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4">Flypchat</h3>
            <p className="text-gray-400 mb-6">
              Connecting you with verified experts for trustworthy advice and personalized consultations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-flyp transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-flyp transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-flyp transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-flyp transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('#hero')} 
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <ChevronRight size={16} className="mr-1" />
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('#experts')} 
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <ChevronRight size={16} className="mr-1" />
                  Browse Experts
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('#features')} 
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <ChevronRight size={16} className="mr-1" />
                  How It Works
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('#faq')} 
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <ChevronRight size={16} className="mr-1" />
                  FAQ
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Expertise</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1" />
                  Finance
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1" />
                  Real Estate
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1" />
                  Career Development
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1" />
                  Business Strategy
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400">
                <Mail size={16} className="mr-2" />
                support@flypchat.com
              </li>
              <li className="flex items-center text-gray-400">
                <Phone size={16} className="mr-2" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center text-gray-400">
                <MessageSquare size={16} className="mr-2" />
                Live Chat Support
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Flypchat. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
