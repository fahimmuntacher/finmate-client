
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Spinner from "../../Components/Spinner/Spinner";
import { FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
// import useAxios from "../../Hooks/useAxios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const accent = "#00C896";

const TransactionDetail = () => {
  const { id } = useParams();
  // const axiosInstance = useAxios()
  const axiosSecure = useAxiosSecure()
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
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 via-white to-green-100">
        <Spinner size={72} color={accent} />
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 via-white to-green-100 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-xl w-full">
          <p className="text-gray-600">Transaction not found.</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-green-100 text-green-600 hover:bg-green-50 transition"
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
      className="min-h-screen bg-linear-to-br from-green-50 via-white to-green-100 py-12 px-4 flex items-start justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl w-full">
        <motion.button
          onClick={() => navigate(-1)}
          whileHover={{ x: -4 }}
          className="flex items-center gap-2 text-gray-700 mb-6"
          style={{ display: "inline-flex" }}
        >
          <FaArrowLeft /> <span className="font-medium">Back</span>
        </motion.button>

        <motion.div
          className="bg-white rounded-2xl shadow-2xl p-8 border border-green-50"
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                Transaction Details
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                View and manage this transaction
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  type === "Expense"
                    ? "bg-red-50 text-red-600"
                    : "bg-green-50 text-green-700"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Category</p>
              <p className="font-medium text-lg">{category}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium">
                {new Date(date).toLocaleDateString()}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-gray-500">User Name</p>
              <p className="font-medium">{userName}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-gray-500">User Email</p>
              <p className="font-medium">{userEmail}</p>
            </div>

            <div className="sm:col-span-2">
              <p className="text-sm text-gray-500">Description</p>
              <p className="font-medium leading-relaxed">
                {description || "—"}
              </p>
            </div>

            {createdAt && (
              <div className="sm:col-span-2 text-right text-sm text-gray-400">
                Created at: {new Date(createdAt).toLocaleString()}
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-3 justify-end">
            <motion.button
              whileHover={{ scale: 1.03 }}
              className="px-4 py-2 rounded-lg text-lg border-green-200 text-green-600 border-2 hover:bg-green-50 transition cursor-pointer"
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
