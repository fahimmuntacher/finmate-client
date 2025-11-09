import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import Spinner from "../../Components/Spinner/Spinner";
import { motion } from "framer-motion";

const MyTransactions = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    setLoading(true);
    axios
      .get(`http://localhost:3000/transactions?email=${user.email}`)
      .then((data) => {
        setTransactions(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user?.email]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-green-50">
        <Spinner size={60} color="#00C896" />
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-green-50 py-12 px-6 flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl font-bold text-green-600 mb-8">
        My Transactions
      </h1>

      {transactions.length === 0 ? (
        <motion.div
          className="bg-white shadow-md rounded-xl p-10 text-center text-gray-600"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="No Data"
            className="w-32 mx-auto mb-4 opacity-80"
          />
          <p className="text-lg font-medium">No transactions found!</p>
        </motion.div>
      ) : (
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-8 border border-green-100">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-green-100 text-green-800 text-lg">
                <tr>
                  <th>#</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t, index) => (
                  <motion.tr
                    key={t._id}
                    className="hover:bg-green-50 transition-all text-gray-700"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td>{index + 1}</td>
                    <td
                      className={`font-semibold ${
                        t.type === "Income"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {t.type}
                    </td>
                    <td>{t.category}</td>
                    <td className="font-semibold">
                      {t.type === "Expense" ? "-" : "+"}${t.amount}
                    </td>
                    <td>{t.description}</td>
                    <td>{new Date(t.date).toLocaleDateString()}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MyTransactions;
