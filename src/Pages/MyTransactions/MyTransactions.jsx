import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import Spinner from "../../Components/Spinner/Spinner";
import { motion } from "framer-motion";
import { data, Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import NoTransaction from "./NoTransaction";
import { toast } from "react-toastify";

const MyTransactions = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("Income");
  const [category, setCategory] = useState("");
  const [updateId, setUpdateId] = useState(null);
  const [deafult, setDefault] = useState(null);
  const navigate = useNavigate();

  // updated data
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

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
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/transactions/${id}`)
          .then((data) => {
            if (data.data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your transaction has been deleted.",
                icon: "success",
              });
              const remaingingTrans = transactions.filter((t) => t._id !== id);
              setTransactions(remaingingTrans);
            }
          });

        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success",
        // });
      }
    });
  };

  // specific transaction

  const specificTransaction = (id) => {
    axios.get(`http://localhost:3000/transactions/${id}`).then((data) => {
      setDefault(data.data);
      console.log(deafult);
    });
  };

  // edit transaction
  const updateTransaction = (e) => {
    e.preventDefault();
    const updateTrans = {
      type,
      category,
      amount: parseFloat(amount),
      description,
      date,
      createdAt: new Date(),
    };
    console.log(updateTrans);

    axios
      .put(`http://localhost:3000/transactions/${updateId}`, updateTrans)
      .then((data) => {
        console.log("data after update", data);
        fetchTransactions();
        document.getElementById("my_modal_5").close();
        toast.success("Updated Transaction successfully!");
        navigate(`/my-transactions/transaction/${updateId}`);
      });
  };

  useEffect(() => {
    if (user?.email) fetchTransactions();
  }, [user, filterType, sortOrder]);

  if (loading) return <Spinner></Spinner>;

  return (
    <div className="min-h-screen">
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
            <label className="mr-2 font-semibold text-gray-700">
              Sort by Date:
            </label>
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
          <NoTransaction></NoTransaction>
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
                  <p className="text-gray-500 text-sm">
                    {new Date(t.date).toLocaleDateString()}
                  </p>
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
                  {/* view detail */}
                  <Link to={`/my-transactions/transaction/${t._id}`}>
                    <button className="px-3 py-1 rounded-lg border border-green-500 text-green-600 cursor-pointer hover:bg-green-50 transition-all">
                      View
                    </button>
                  </Link>

                  {/* update button */}

                  <button
                    onClick={() => {
                      setUpdateId(t._id);
                      specificTransaction(t._id);
                      document.getElementById("my_modal_5").showModal();
                    }}
                    className="px-3 py-1 rounded-lg border border-yellow-500 text-yellow-600 hover:bg-yellow-50 transition-all cursor-pointer"
                  >
                    update
                  </button>

                  {/* delte btn */}
                  <button
                    onClick={() => {
                      deleteTransaction(t._id);
                    }}
                    className="px-3 py-1 rounded-lg border border-red-500 text-red-600 hover:bg-red-50 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* update modal */}
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-white shadow-xl border rounded-2xl">
            <h3 className="font-bold text-2xl text-center mb-4 text-gray-800">
              Update Transaction
            </h3>

            <form onSubmit={updateTransaction} className="space-y-4">
              {/* Type */}
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Type
                </label>
                <select
                  defaultValue={deafult?.type}
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
                  defaultValue={deafult?.category}
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
                <label className="block text-gray-600 font-medium mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  defaultValue={deafult?.amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="input input-bordered w-full bg-gray-50 focus:ring-2 focus:ring-[#00C896] text-gray-800 text-base"
                  placeholder="Enter amount"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={deafult?.description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="3"
                  className="textarea textarea-bordered w-full bg-gray-50 focus:ring-2 focus:ring-[#00C896] text-gray-800 text-base"
                  placeholder="Write description"
                ></textarea>
              </div>

              {/* Date */}
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  defaultValue={deafult?.date}
                  onChange={(e) => setDate(e.target.value)}
                  className="input input-bordered w-full bg-gray-50 focus:ring-2 focus:ring-[#00C896] text-gray-800 text-base"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => document.getElementById("my_modal_5").close()}
                  className="border border-[#00C896] text-[#00C896] bg-white py-2.5 px-4 rounded-xl font-medium hover:bg-green-50 transition-all duration-200"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#00C896] text-white font-semibold py-2.5 px-6 rounded-xl shadow hover:bg-green-700 transition-all duration-200 disabled:opacity-60"
                >
                  {loading ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default MyTransactions;
