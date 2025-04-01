import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
      isScrolled ? 'bg-slate-900/70 shadow-sm backdrop-blur-lg' : 'bg-transparent'
    }`}>
      <div className="container flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center">
            <span className="text-2xl font-bold tracking-tight text-blue-400">FOVY</span>
          </a>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a 
            className="nav-link-dark" 
            href="#features"
            onClick={(e) => handleNavClick(e, 'features')}
          >
            Features
          </a>
          <a 
            className="nav-link-dark" 
            href="#mind-map"
            onClick={(e) => handleNavClick(e, 'mind-map')}
          >
            Career Mapping
          </a>
          <a 
            className="nav-link-dark" 
            href="#smart-matching"
            onClick={(e) => handleNavClick(e, 'smart-matching')}
          >
            Smart Matching
          </a>
          <a 
            className="nav-link-dark" 
            href="#air-minder"
            onClick={(e) => handleNavClick(e, 'air-minder')}
          >
            AIR Minder
          </a>
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-9 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-slate-200 shadow-sm hover:bg-slate-700/50"
            onClick={() => navigate('/sign-in')}
          >
            Sign In
          </Button>
          <Button 
            size="sm" 
            className="h-9 bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-900/20"
            onClick={() => navigate('/sign-in')}
          >
            Get Started
          </Button>
        </div>
        <button
          className="flex items-center justify-center rounded-md p-2 text-slate-300 hover:text-white md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Toggle menu</span>
        </button>
      </div>
      
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto bg-slate-900/90 backdrop-blur-lg p-6 pb-32 shadow-md animate-fade-in md:hidden">
          <div className="flex flex-col gap-6 text-lg">
            <a
              className="flex items-center py-2 text-slate-300 hover:text-white"
              href="#features"
              onClick={(e) => handleNavClick(e, 'features')}
            >
              Features
            </a>
            <a
              className="flex items-center py-2 text-slate-300 hover:text-white"
              href="#mind-map"
              onClick={(e) => handleNavClick(e, 'mind-map')}
            >
              Career Mapping
            </a>
            <a
              className="flex items-center py-2 text-slate-300 hover:text-white"
              href="#smart-matching"
              onClick={(e) => handleNavClick(e, 'smart-matching')}
            >
              Smart Matching
            </a>
            <a
              className="flex items-center py-2 text-slate-300 hover:text-white"
              href="#air-minder"
              onClick={(e) => handleNavClick(e, 'air-minder')}
            >
              AIR Minder
            </a>
            <div className="flex flex-col gap-2 pt-4">
              <Button variant="outline" className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-slate-200 rounded-xl hover:bg-slate-700/50">
                Sign In
              </Button>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-900/20">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
