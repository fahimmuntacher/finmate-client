import React from "react";
import { motion } from "framer-motion";
import { FaRegSmile } from "react-icons/fa";
import { Link } from "react-router";

const NoTransaction = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center mt-10 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center border border-green-100">
        <div className="text-green-600 text-6xl mb-4 flex justify-center">
          <FaRegSmile />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          No Transactions Yet
        </h2>
        <p className="text-gray-600 mb-6">
          You haven’t added any transactions yet. Start adding your income or
          expenses to track your finances better!
        </p>
        <Link to="/add-transaction">
          <button className="bg-[#00C896] hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-200 cursor-pointer">
            Add Your First Transaction
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default NoTransaction;
