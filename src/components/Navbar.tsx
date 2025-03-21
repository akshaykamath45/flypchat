
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out",
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-flyp">Flypchat</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('#hero')} 
              className="text-gray-700 hover:text-flyp transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('#experts')} 
              className="text-gray-700 hover:text-flyp transition-colors"
            >
              Experts
            </button>
            <button 
              onClick={() => scrollToSection('#features')} 
              className="text-gray-700 hover:text-flyp transition-colors"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection('#faq')} 
              className="text-gray-700 hover:text-flyp transition-colors"
            >
              FAQ
            </button>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-flyp to-flyp-400 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
              <button 
                onClick={() => scrollToSection('#experts')}
                className="relative bg-white text-flyp border border-flyp rounded-full px-5 py-2 hover:shadow-md transition-all"
              >
                Find an Expert
              </button>
            </div>
          </nav>
          
          <div className="flex md:hidden">
            <button 
              onClick={toggleMenu} 
              className="text-gray-700 hover:text-flyp focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={cn(
          "md:hidden bg-white absolute w-full transition-all duration-300 ease-in-out overflow-hidden shadow-md",
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 pt-2 pb-6 space-y-2">
          <button 
            onClick={() => {
              scrollToSection('#hero');
              setIsMenuOpen(false);
            }} 
            className="block w-full text-left py-3 text-gray-700 hover:text-flyp"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('#experts')} 
            className="block w-full text-left py-3 text-gray-700 hover:text-flyp"
          >
            Experts
          </button>
          <button 
            onClick={() => scrollToSection('#features')} 
            className="block w-full text-left py-3 text-gray-700 hover:text-flyp"
          >
            How It Works
          </button>
          <button 
            onClick={() => scrollToSection('#faq')} 
            className="block w-full text-left py-3 text-gray-700 hover:text-flyp"
          >
            FAQ
          </button>
          <div className="pt-2">
            <button 
              onClick={() => scrollToSection('#experts')}
              className="block w-full text-center bg-flyp text-white rounded-full py-3 hover:bg-flyp-600"
            >
              Find an Expert
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
