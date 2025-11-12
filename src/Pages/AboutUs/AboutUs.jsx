import { motion } from "framer-motion";
import { FaChartPie, FaPiggyBank, FaUsers } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="min-h-screen text-gray-800 dark:text-gray-200 dark:bg-neutral-900">
      <title>About Us | Finmate</title>
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center text-green-700 dark:text-green-400 mb-8"
        >
          About FinMate
        </motion.h1>

        {/* Intro Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-center text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto"
        >
          FinMate is your trusted financial companion built to help you take
          control of your money. We make tracking income, expenses, and savings
          effortless, so you can focus on what truly matters: growing your
          future.
        </motion.p>

        {/* Icons Section */}
        <div className="grid md:grid-cols-3 gap-10 mt-16 text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
          >
            <FaChartPie className="text-green-600 dark:text-green-400 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Smart Insights
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Visualize your spending patterns with detailed charts and
              financial reports.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
          >
            <FaPiggyBank className="text-green-600 dark:text-green-400 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Simplified Saving
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Set goals and track your progress: FinMate keeps your finances on
              the right track.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
          >
            <FaUsers className="text-green-600 dark:text-green-400 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Built for Everyone
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Whether you're a student, freelancer, or business owner, FinMate
              adapts to your lifestyle.
            </p>
          </motion.div>
        </div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-20 text-center"
        >
          <h2 className="text-4xl font-semibold text-green-700 dark:text-green-400 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
            We believe everyone deserves financial clarity. That’s why FinMate
            was designed to be intuitive, fast, and insightful helping users
            around the world track every expense, stay organized, and reach
            their financial goals with confidence.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
