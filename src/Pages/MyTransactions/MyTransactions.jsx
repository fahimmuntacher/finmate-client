import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import Spinner from "../../Components/Spinner/Spinner";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { toast } from "react-toastify";


const MyTransactions = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter & sort state
  const [filterType, setFilterType] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  // Fetch transactions
  const fetchTransactions = () => {
    setLoading(true);
    const query = new URLSearchParams();
    if (filterType) query.append("type", filterType);
    if (sortOrder) query.append("sortByDate", sortOrder);

    axios
      .get(`http://localhost:3000/transactions?email=${user.email}&${query}`)
      .then((res) => {
        setTransactions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  // Delete Transaction 
  const deleteTransaction = (id) => {
      
      axios.delete(`http://localhost:3000/transactions/${id}`)
      console.log("item deleted")
      toast.success("Transaction deleted successfully")
  }

  useEffect(() => {
    if (user?.email) fetchTransactions();
  }, [user, filterType, sortOrder]);

  if (loading) return <Spinner></Spinner>;

  return (
    <div className="min-h-screen bg-linear-to-b from-green-100 to bg-green-50">
      <div className="max-w-5xl mx-auto py-10 px-4 ">
      <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">
        My Transactions
      </h1>

      {/* Filter & Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div>
          <label className="mr-2 font-semibold text-gray-700">Filter:</label>
          <select
            className="border-2 border-green-400 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">All</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>

        <div>
          <label className="mr-2 font-semibold text-gray-700">Sort by Date:</label>
          <select
            className="border-2 border-green-400 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Transactions List */}
      {transactions.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No transactions found.</p>
      ) : (
        <motion.div
          className="grid gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {transactions.map((t) => (
            <motion.div
              key={t._id}
              className="bg-white rounded-2xl shadow-lg p-5 border border-green-100 flex justify-between items-center"
              whileHover={{ scale: 1.02 }}
            >
              <div>
                <p className="text-gray-500 text-sm">{new Date(t.date).toLocaleDateString()}</p>
                <p className="font-semibold text-gray-700">{t.description}</p>
                <p
                  className={`font-bold ${
                    t.type === "Income" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {t.type === "Income" ? "+" : "-"}${t.amount}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Link to={`/my-transactions/transaction/${t._id}`}>
                <button className="px-3 py-1 rounded-lg border border-green-500 text-green-600 cursor-pointer hover:bg-green-50 transition-all">
                  View
                </button></Link>
                <Link to={`/my-transactions/transaction-edit/${t._id}`}>
                <button  className="px-3 py-1 rounded-lg border border-yellow-500 text-yellow-600 hover:bg-yellow-50 transition-all cursor-pointer">
                  Edit
                </button></Link>
                <button onClick={()=> deleteTransaction(t._id)} className="px-3 py-1 rounded-lg border border-red-500 text-red-600 hover:bg-red-50 transition-all">
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
    </div>
  );
};

export default MyTransactions;
