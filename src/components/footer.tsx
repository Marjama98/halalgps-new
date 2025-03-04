import { FaApple, FaGooglePlay } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Logo & Short Description */}
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-xl font-semibold">HalalGPS</h2>
          <p className="text-gray-400 text-sm mt-2">
            Find the best halal restaurants near you.
          </p>
        </div>

        {/* CTA Download Section */}
        <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-4">
          <a
            href="#"
            className="flex items-center bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            <FaApple className="text-xl mr-2" />
            <span className="text-sm">Download on the</span>
            <strong className="ml-1">App Store</strong>
          </a>
          <a
            href="#"
            className="flex items-center bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            <FaGooglePlay className="text-xl mr-2" />
            <span className="text-sm">Get it on</span>
            <strong className="ml-1">Google Play</strong>
          </a>
        </div>

        {/* Footer Links */}
        <div className="mt-6 md:mt-0 text-center md:text-right">
          <nav className="flex space-x-4 text-gray-400 text-sm">
            <a href="/about-us" className="hover:text-white">About</a>
            <a href="/contact-us" className="hover:text-white">Contact</a>
            <a href="/faq" className="hover:text-white">FAQ</a>
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
