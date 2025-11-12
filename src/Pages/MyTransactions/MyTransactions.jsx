import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";

import Spinner from "../../Components/Spinner/Spinner";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import NoTransaction from "./NoTransaction";
import { toast } from "react-toastify";
import UpdateModal from "./UpdateModal";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

// import useAxios from "../../Hooks/useAxios";

const MyTransactions = () => {
  const { user } = useContext(AuthContext);
  // const axiosInstance = useAxios()
  const axiosSecure = useAxiosSecure()
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

    axiosSecure
      .get(`/transactions?email=${user.email}&${query}`)
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
        axiosSecure
          .delete(`/transactions/${id}`)
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

      }
    });
  };

  // specific transaction

  const specificTransaction = (id) => {
    axiosSecure.get(`/transactions/${id}`).then((data) => {
      setDefault(data.data);
      // console.log(deafult);
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
    // console.log(updateTrans);

   axiosSecure
      .put(`/transactions/${updateId}`, updateTrans)
      .then((data) => {
        // console.log("data after update", data);
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
    <div className="min-h-screen dark:bg-neutral-800">
      
      <title>My Transactions | Finmate</title>
      <div className="max-w-5xl mx-auto py-10 px-4 ">
        <h1 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-6 text-center">
          My Transactions
        </h1>

        {/* Filter & Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div>
            <label className="mr-2 font-semibold text-gray-700 dark:text-gray-300">Filter:</label>
            <select
              className="border-2 border-green-400 dark:border-green-500 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 bg-white dark:bg-neutral-700 text-gray-700 dark:text-gray-300"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">All</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>

          <div>
            <label className="mr-2 font-semibold text-gray-700 dark:text-gray-300">
              Sort by Date:
            </label>
            <select
              className="border-2 border-green-400 dark:border-green-500 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 bg-white dark:bg-neutral-700 text-gray-700 dark:text-gray-300"
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
                className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-5 border border-green-100 dark:border-neutral-700 flex justify-between items-center"
                whileHover={{ scale: 1.02 }}
              >
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {new Date(t.date).toLocaleDateString()}
                  </p>
                  <p className="font-semibold text-gray-700 dark:text-gray-200">{t.description}</p>
                  <p
                    className={`font-bold ${
                      t.type === "Income" ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"
                    }`}
                  >
                    {t.type === "Income" ? "+" : "-"}${t.amount}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {/* view detail */}
                  <Link to={`/my-transactions/transaction/${t._id}`}>
                    <button className="px-3 py-1 rounded-lg border border-green-500 dark:border-green-400 text-green-600 dark:text-green-400 cursor-pointer hover:bg-green-50 dark:hover:bg-green-900 transition-all">
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
                    className="px-3 py-1 rounded-lg border border-yellow-500 dark:border-yellow-400 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900 transition-all cursor-pointer"
                  >
                    update
                  </button>

                  {/* delte btn */}
                  <button
                    onClick={() => {
                      deleteTransaction(t._id);
                    }}
                    className="px-3 py-1 rounded-lg border border-red-500 dark:border-red-400 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 transition-all cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* update modal */}

        <UpdateModal
          modalId="my_modal_5"
          deafult={deafult}
          updateTransaction={updateTransaction}
          type={type}
          setType={setType}
          category={category}
          setCategory={setCategory}
          amount={amount}
          setAmount={setAmount}
          description={description}
          setDescription={setDescription}
          date={date}
          setDate={setDate}
          loading={loading}
        ></UpdateModal>
      </div>
    </div>
  );
};

export default MyTransactions;
