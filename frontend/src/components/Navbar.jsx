import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const isActive = (path) => {
    return location.pathname === path ? 'trackify-blue font-medium' : 'text-gray-700';
  };
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-4 px-6 border-b ${
      isScrolled ? 'bg-white/75 border-transparent' : 'bg-white border-gray-200'
    } transition-all duration-300`}>
      
      {/* Logo */}
      <Link to="/" className='text-2xl font-bold trackify-blue'>
        Trackify
      </Link>
      
      {/* Desktop Navigation */}
      <div className='hidden md:flex space-x-6'>
        <Link to="/" className={`hover:text-blue-900 transition-colors ${isActive("/")}`}>
          Home
        </Link>
        <Link to="/dashboard" className={`hover:text-blue-900 transition-colors ${isActive("/dashboard")}`}>
          Dashboard
        </Link>
      </div>
      
      {/* Desktop Buttons */}
      <div className='hidden md:flex space-x-3'>
        <Link to="/login">
          <button className='px-4 py-1 text-gray-700 border border-gray-300 rounded hover:bg-gray-100 transition-colors'>
            Login
          </button>
        </Link>
        <Link to="/sign-up">
          <button className='px-4 py-1 btn-primary text-white rounded hover:bg-blue-700 transition-colors'>
            Sign Up
          </button>
        </Link>
      </div>
      
      {/* Mobile Menu Button */}
      <button
        className='md:hidden text-gray-700 focus:outline-none'
        onClick={toggleMenu}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='absolute top-full left-0 right-0 bg-white shadow-md py-4 px-6 z-50 md:hidden'>
          <div className='flex flex-col space-y-4'>
            <Link
              to="/"
              className={`hover:text-blue-900 transition-colors ${isActive("/")}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className={`hover:text-blue-900 transition-colors ${isActive("/dashboard")}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <div className='pt-2 border-t border-gray-200 flex flex-col space-y-3'>
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <button className='w-full px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-100 transition-colors'>
                  Login
                </button>
              </Link>
              <Link to="/sign-up" onClick={() => setIsMenuOpen(false)}>
                <button className='w-full px-4 py-2 trackify-blue text-white rounded hover:bg-blue-600 transition-colors'>
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;