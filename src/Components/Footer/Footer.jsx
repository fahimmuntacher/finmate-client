import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaArrowUp,
} from "react-icons/fa";
import logo from "../../assets/logo.svg"; // replace with your logo

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-green-50 dark:bg-neutral-700 border-t border-gray-200 dark:border-neutral-600 relative overflow-hidden">
      {/* Top bar icon for scrolling */}
      <div
        onClick={scrollToTop}
        className="fixed bottom-5 right-5 bg-green-600 dark:bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-green-500 dark:hover:bg-green-600 cursor-pointer z-50 transition-all"
      >
        <FaArrowUp />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        {/* Logo & Website Name */}
        <div className="flex flex-col items-start">
          <img src={logo} alt="Finmate Logo" className="w-32 mb-3" />
          <span className="text-xl font-bold text-green-600 dark:text-green-400">Finmate</span>
          <p className="text-gray-500 mt-2 dark:text-gray-300">
            Track your income, expenses and savings smartly.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-gray-800 dark:text-gray-100 font-semibold mb-4">Contact</h3>
          <p className="text-gray-500 dark:text-gray-300">Email: support@finmate.com</p>
          <p className="text-gray-500 dark:text-gray-300">Phone: +880 123 456 789</p>
          <p className="text-gray-500 dark:text-gray-300">Address: Dhaka, Bangladesh</p>
        </div>

        {/* Terms & Links */}
        <div>
          <h3 className="text-gray-800 font-semibold dark:text-gray-100 mb-4">Legal</h3>
          <ul className="space-y-2 text-gray-500 dark:text-gray-300">
            <li>
              <a href="/terms" className="hover:hover:text-green-600 dark:hover:text-green-400 transition-all">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a
                href="/privacy"
                className="hover:text-green-600 dark:hover:text-green-400 transition-all"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:text-green-600 dark:hover:text-green-400 transition-all">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-gray-800 font-semibold dark:text-gray-100 mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-gray-500 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-all"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="text-gray-500 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-all"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="text-gray-500 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-all"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="text-gray-500 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-all"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className=" text-gray-500 dark:text-gray-300 text-center py-4 border-t border-gray-200">
        &copy; {new Date().getFullYear()} Finmate. All rights reserved.
      </div>

      <div
        className="absolute top-0 left-0 w-64 h-64 bg-green-300 dark:bg-neutral-900 rounded-full opacity-30 -translate-x-32 -translate-y-32"
      />
      <div
        className="absolute bottom-0 right-0 w-80 h-80 bg-green-300 dark:bg-neutral-900 rounded-full opacity-20 translate-x-32 translate-y-32"
        
      />
    </footer>
  );
};

export default Footer;
