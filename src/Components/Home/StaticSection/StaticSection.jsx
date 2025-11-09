import React from "react";
import { motion } from "framer-motion";
import budgetingImg from "../../../assets/budgeting.png"; // illustration for Budgeting Tips
import planningImg from "../../../assets/planning.png"; // illustration for Financial Planning

const StaticSections = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 space-y-20">
      {/* Section 1: Budgeting Tips */}
      <motion.div
        className="flex flex-col md:flex-row items-center gap-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex-1">
          <img
            src={budgetingImg}
            alt="Budgeting Tips"
            className="w-full max-w-md mx-auto rounded-2xl"
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-bold text-green-600 mb-4">
            Budgeting Tips
          </h2>
          <p className="text-gray-700 text-lg">
            Learn simple ways to manage your income and expenses efficiently.
            Track your spending, save smartly, and stay financially healthy.
          </p>
        </div>
      </motion.div>

      {/* Section 2: Why Financial Planning Matters */}
      <motion.div
        className="flex flex-col md:flex-row-reverse items-center gap-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex-1">
          <img
            src={planningImg}
            alt="Financial Planning"
            className="w-full max-w-md mx-auto"
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-bold text-green-600 mb-4">
            Why Financial Planning Matters?
          </h2>
          <p className="text-gray-700 text-lg">
            Proper financial planning helps you achieve long-term goals, avoid
            unnecessary debt, and secure your future. Take control and make
            your money work for you.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default StaticSections;
