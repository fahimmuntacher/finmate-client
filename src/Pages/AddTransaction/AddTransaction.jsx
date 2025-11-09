import React, { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import transactionIllustration from "../../assets/trasaction.jpg";
import axios from "axios";

const AddTransaction = () => {
  const { user } = useContext(AuthContext);

  const [type, setType] = useState("Income");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState();
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setType("Income");
    setCategory("");
    setAmount();
    setDescription("");
    setDate("");
    const userEmail = e.target.email.value;
    const userName = e.target.userName.value;
    const newTransaction = { type, category, amount, description, date, userEmail, userName};
    axios
      .post("http://localhost:3000/transactions", newTransaction)
      .then((data) => {
        console.log(data.data);
        if (data.data.insertedId) {
          toast.success("Transaction Added Successfully!");
        }
      });
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-green-50 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl flex flex-col lg:flex-row overflow-hidden">
        {/* Illustration Side */}
        <div className="hidden lg:flex lg:w-1/2 bg-green-100 items-center justify-center p-6">
          <img
            src={transactionIllustration}
            alt="Transaction Illustration"
            className="w-full h-auto object-contain rounded-3xl"
          />
        </div>

        {/* Form Side */}
        <div className="w-full lg:w-1/2 p-8 md:p-12">
          <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">
            Add Transaction
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Type */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="">Select Category</option>
                {type === "Income" ? (
                  <>
                    <option value="Salary">Salary</option>
                    <option value="Business">Business</option>
                    <option value="Investment">Investment</option>
                  </>
                ) : (
                  <>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Bills">Bills</option>
                  </>
                )}
              </select>
            </div>

            {/* Amount */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                rows={3}
              />
            </div>

            {/* Date */}
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* User Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  User Email
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  name="email"
                  readOnly
                  className="w-full border bg-gray-100 rounded-lg px-3 py-2 text-gray-600 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  User Name
                </label>
                <input
                  type="text"
                  name="userName"
                  value={user?.displayName || ""}
                  readOnly
                  className="w-full border bg-gray-100 rounded-lg px-3 py-2 text-gray-600 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Submit button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-[#00C896] text-white font-semibold py-2 rounded-lg shadow-md transition-all"
            >
              Add Transaction
            </motion.button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default AddTransaction;
