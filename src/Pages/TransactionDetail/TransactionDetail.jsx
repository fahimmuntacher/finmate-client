import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Spinner from "../../Components/Spinner/Spinner";
import { FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const accent = "#00C896";

const TransactionDetail = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get(`/transactions/${id}`)
      .then((res) => {
        setTransaction(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 via-white to-green-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
        <Spinner size={72} color={accent} />
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-linear-to-br from-green-50 via-white to-green-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
        <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-8 text-center max-w-xl w-full border border-green-100 dark:border-neutral-700">
          <p className="text-gray-600 dark:text-gray-300">Transaction not found.</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-green-100 dark:border-green-700 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-800 transition"
          >
            <FaArrowLeft /> Go Back
          </button>
        </div>
      </div>
    );
  }

  const {
    type,
    category,
    amount,
    description,
    date,
    userEmail,
    userName,
    createdAt,
  } = transaction;

  return (
    <motion.div
      className="min-h-screen py-12 px-4 flex items-start justify-center bg-linear-to-br from-green-50 via-white to-green-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl w-full">
        <motion.button
          onClick={() => navigate(-1)}
          whileHover={{ x: -4 }}
          className="flex items-center gap-2 mb-6 text-gray-700 dark:text-gray-300"
        >
          <FaArrowLeft /> <span className="font-medium">Back</span>
        </motion.button>

        <motion.div
          className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl p-8 border border-green-50 dark:border-neutral-700"
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">
                Transaction Details
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Transaction Id: <strong className="font-bold">{transaction._id}</strong>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  type === "Expense"
                    ? "bg-red-50 text-red-600 dark:bg-red-900 dark:text-red-400"
                    : "bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-400"
                }`}
                style={{
                  border: `1px solid ${
                    type === "Expense" ? "#FCA5A5" : "#C7F9E3"
                  }`,
                }}
              >
                {type}
              </span>

              <motion.div
                whileHover={{ scale: 1.03 }}
                className="px-4 py-2 rounded-lg text-white font-semibold"
                style={{
                  background: `linear-gradient(90deg, ${accent}, #00a67a)`,
                }}
              >
                <span className="text-lg">${amount}</span>
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
            <div className="space-y-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">Category</p>
              <p className="font-medium text-lg">{category}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
              <p className="font-medium">{new Date(date).toLocaleDateString()}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">User Name</p>
              <p className="font-medium">{userName}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">User Email</p>
              <p className="font-medium">{userEmail}</p>
            </div>

            <div className="sm:col-span-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">Description</p>
              <p className="font-medium leading-relaxed">{description || "—"}</p>
            </div>

            {createdAt && (
              <div className="sm:col-span-2 text-right text-sm text-gray-400 dark:text-gray-500">
                Created at: {new Date(createdAt).toLocaleString()}
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-3 justify-end">
            <motion.button
              whileHover={{ scale: 1.03 }}
              className="px-4 py-2 rounded-lg text-lg border-2 border-green-200 dark:border-green-600 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-800 transition cursor-pointer"
              onClick={() => navigate(-1)}
            >
              Close
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TransactionDetail;
