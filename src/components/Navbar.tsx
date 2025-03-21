
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            <Link to="/" className="text-gray-700 hover:text-flyp transition-colors">Home</Link>
            <Link to="/#experts" className="text-gray-700 hover:text-flyp transition-colors">Experts</Link>
            <Link to="/#features" className="text-gray-700 hover:text-flyp transition-colors">How It Works</Link>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-flyp to-flyp-400 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
              <Link 
                to="/#experts" 
                className="relative bg-white text-flyp border border-flyp rounded-full px-5 py-2 hover:shadow-md transition-all"
              >
                Find an Expert
              </Link>
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
          <Link 
            to="/" 
            className="block py-3 text-gray-700 hover:text-flyp"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/#experts" 
            className="block py-3 text-gray-700 hover:text-flyp"
            onClick={() => setIsMenuOpen(false)}
          >
            Experts
          </Link>
          <Link 
            to="/#features" 
            className="block py-3 text-gray-700 hover:text-flyp"
            onClick={() => setIsMenuOpen(false)}
          >
            How It Works
          </Link>
          <div className="pt-2">
            <Link 
              to="/#experts" 
              className="block w-full text-center bg-flyp text-white rounded-full py-3 hover:bg-flyp-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Find an Expert
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
