import { FaApple, FaGooglePlay } from "react-icons/fa";
import Image from "next/image"; // Don't forget to import Image from next/image


export default function Footer() {
  return (
    <footer className="bg-white text-gray-900 py-10 px-6 border-t-1 border-[#6d7f43]">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
      {/* Logo & Short Description */}
      <div className="text-center md:text-left mb-6 md:mb-0">
        {/* Logo image instead of text */}
        <Image 
          src="/images/1logo.png" // Your logo path
          alt="Halal GPS Logo"
          width={120}  // Adjust size as needed
          height={60}  // Adjust size as needed
          className="mb-2"
        />
        <p className="text-gray-400 text-sm mt-2">
          Find the best halal <br />restaurants near you.
        </p>
      </div>

        
        {/* Footer Links */}
        <div className="mt-6 md:mt-0 text-center md:text-right">
          <nav className="flex space-x-4 text-gray-400 text-sm">
            <a href="/about-us" className="hover:text-white">About</a>
            <a href="/contact-us" className="hover:text-white">Contact</a>
            <a href="#about-faq" className="hover:text-white">FAQ</a>
          </nav>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-xs mt-6">
        &copy; {new Date().getFullYear()} HalalGPS. All rights reserved.
      </div>
    </footer>
  );
}
