import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-linear-to-b from-green-50 to-white text-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white border border-green-200 rounded-2xl shadow-lg p-10 max-w-lg"
      >
        <div className="flex justify-center mb-6">
          <FaExclamationTriangle className="text-red-600 text-6xl" />
        </div>
        <h1 className="text-5xl font-bold text-green-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-500 mb-8">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-block bg-[#00C896] text-white px-6 py-3 rounded-xl font-semibold shadow-md transition-all duration-300"
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
