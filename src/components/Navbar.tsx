import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the mobile menu visibility
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar flex justify-between items-center p-4 mr-[10px]">
      <a href="/">
        <img src="/images/1logo.png" alt="HALALGPS logo" className="h-10" />
      </a>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-10 mr-[80px]">
        <a href="/" className="text-[16px] font-regular text-gray-400 hover:text-[6D7F43]-500">Home</a>
        <a href="/contact-us" className="text-[16px] font-regular text-gray-400 hover:text-[6D7F43]-500">Contact Us</a>
        <a href="/about-us" className="text-[16px] font-regular text-gray-400 hover:text-[6D7F43]-500">About Us</a>
        <a href="/faq" className="text-[16px] font-regular text-gray-400 hover:text-[6D7F43]-500">FAQ</a>
      </div>

      {/* Hamburger Icon (Mobile) */}
      <div className="md:hidden" onClick={toggleMenu}>
        <div className={`w-6 h-0.5 bg-gray-400 my-1 transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
        <div className={`w-6 h-0.5 bg-gray-400 my-1 transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}></div>
        <div className={`w-6 h-0.5 bg-gray-400 my-1 transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-800 bg-opacity-50"
          onClick={toggleMenu} // Close the menu when clicking on the overlay
        ></div>
      )}

      {/* Sliding Menu */}
      <div
        className={`fixed top-0 right-0 w-2/3 h-full bg-white p-6 transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <a href="/" className="block text-[16px] font-regular text-gray-400 hover:text-blue-500 py-3">Home</a>
        <a href="/contact-us" className="block text-[16px] font-regular text-gray-400 hover:text-blue-500 py-3">Contact Us</a>
        <a href="/about-us" className="block text-[16px] font-regular text-gray-400 hover:text-blue-500 py-3">About Us</a>
        <a href="/faq" className="block text-[16px] font-regular text-gray-400 hover:text-blue-500 py-3">FAQ</a>
      </div>
    </nav>
  );
};

export default Navbar;
