import React from "react";
import { motion } from "framer-motion";
import bannerImage from "../../../assets/bannerImg.png"; // replace with your image
import { BiRightTopArrowCircle } from "react-icons/bi";

const HeroBanner = () => {
  return (
    <section className="bg-green-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-8">
        {/* Text Section */}
        <motion.div
          className="flex-1"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-green-600 mb-4">
            Master your money, Master your future.
          </h1>
          <p className="text-gray-700 text-lg mb-6">
            Track your income, expenses, and savings goals with{" "}
            <span className="font-semibold text-green-600">Finmate</span>.
            Make smarter financial decisions today.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-lg bg-[#00C896] text-white font-semibold text-xl shadow-lg transition-all flex items-center gap-2.5 cursor-pointer"
          >
            Get Started <BiRightTopArrowCircle></BiRightTopArrowCircle>
          </motion.button>
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="flex-1"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img src={bannerImage} alt="Finance Illustration" className="w-full rounded-2xl" />
        </motion.div>
      </div>

      {/* Optional decorative background shapes */}
      <motion.div
        className="absolute top-0 left-0 w-64 h-64 bg-green-200 rounded-full opacity-30 -translate-x-32 -translate-y-32"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-80 h-80 bg-green-300 rounded-full opacity-20 translate-x-32 translate-y-32"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 90, ease: "linear" }}
      />
    </section>
  );
};

export default HeroBanner;
