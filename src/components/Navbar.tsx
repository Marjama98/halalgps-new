"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Get the current route

  // Toggle the mobile menu visibility
  const toggleMenu = () => setIsOpen(!isOpen);

  // Apply transparent background and green links only on the landing page ("/")
  const navbarStyles =
    pathname === "/"
      ? "absolute w-full top-0 left-0 bg-white bg-opacity-75 text-white p-4" // 75% opacity for landing page
      : "bg-white shadow-md p-4"; // Default navbar for other pages

  // Set link color based on the current page
  const linkStyles =
    pathname === "/"
      ? "text-[#6D7F43] hover:text-[#4d5f30]" // Green color for landing page
      : "text-gray-400 hover:text-[#6D7F43]"; // Default gray links for other pages

  return (
    <nav className={`navbar flex justify-between items-center ${navbarStyles}`}>
      <Link href="/">
        <Image
          src="/images/1logo.png"
          alt="HALALGPS logo"
          width={150}
          height={80}
          className="h-10"
        />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-10 mr-[80px]">
        <Link href="/" className={`text-[16px] font-regular ${linkStyles}`}>
          Home
        </Link>
        <Link href="/contact-us" className={`text-[16px] font-regular ${linkStyles}`}>
          Contact Us
        </Link>
        <Link href="/about-us" className={`text-[16px] font-regular ${linkStyles}`}>
          About Us
        </Link>
        <Link href="#about-faq" className={`text-[16px] font-regular ${linkStyles}`}>
          FAQ
        </Link>
      </div>

      {/* Hamburger Icon (Mobile) */}
      <div className="md:hidden" onClick={toggleMenu}>
        <div className={`w-6 h-0.5 bg-gray-400 my-1 transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}></div>
        <div className={`w-6 h-0.5 bg-gray-400 my-1 transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`}></div>
        <div className={`w-6 h-0.5 bg-gray-400 my-1 transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}></div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-800 bg-opacity-50"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Sliding Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-2/3 h-full bg-white p-6 transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Link href="/" className={`block text-[16px] font-regular ${linkStyles} py-3`}>
          Home
        </Link>
        <Link href="/contact-us" className={`block text-[16px] font-regular ${linkStyles} py-3`}>
          Contact Us
        </Link>
        <Link href="/about-us" className={`block text-[16px] font-regular ${linkStyles} py-3`}>
          About Us
        </Link>
        <Link href="#about-faq" className={`block text-[16px] font-regular ${linkStyles} py-3`}>
          FAQ
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
