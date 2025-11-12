import { useState, useEffect, useContext } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { AuthContext } from "../../Context/AuthContext";
import Spinner from "../../Components/Spinner/Spinner";
// import useAxios from "../../Hooks/useAxios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const COLORS = ["#00C896", "#FF6B6B", "#FFD93D", "#6C63FF"];

const Reports = () => {
  const { user } = useContext(AuthContext);
  // const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure()
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [summary, setSummary] = useState({ income: 0, expense: 0, balance: 0 });
  const [loading, setLoading] = useState(true);

  // Fetch data
  useEffect(() => {
    if (!user?.email) return;
    setLoading(true);
    axiosSecure.get(`/transactions?email=${user.email}`).then((res) => {
      const data = res.data;
      if (selectedMonth) {
        const filtered = data.filter(
          (t) => new Date(t.date).getMonth() + 1 === parseInt(selectedMonth)
        );
        setTransactions(filtered);
      } else {
        setTransactions(data);
      }

      const income = data
        .filter((t) => t.type === "Income")
        .reduce((acc, cur) => acc + Number(cur.amount), 0);
      const expense = data
        .filter((t) => t.type === "Expense")
        .reduce((acc, cur) => acc + Number(cur.amount), 0);
      setSummary({ income, expense, balance: Math.max(0, income - expense) });
    });
    setLoading(false);
  }, [user, selectedMonth, axiosSecure]);

  // Pie chart data (Category-wise Expense)
  const categoryData = Object.values(
    transactions.reduce((acc, t) => {
      acc[t.category] = acc[t.category] || { name: t.category, value: 0 };
      acc[t.category].value += Number(t.amount);
      return acc;
    }, {})
  );

  // Monthly totals (for bar chart)
  const monthlyTotals = Array.from({ length: 12 }, (_, i) => {
    const monthData = transactions.filter(
      (t) => new Date(t.date).getMonth() === i
    );
    const income = monthData
      .filter((t) => t.type === "Income")
      .reduce((acc, cur) => acc + Number(cur.amount), 0);
    const expense = monthData
      .filter((t) => t.type === "Expense")
      .reduce((acc, cur) => acc + Number(cur.amount), 0);
    return {
      month: new Date(2025, i).toLocaleString("default", { month: "short" }),
      income,
      expense,
    };
  });

  if (loading) {
    return <Spinner></Spinner>;
  }
  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <title>Reports | Finmate</title>
      <h1 className="text-3xl font-bold text-green-600 mb-8 text-center">
        Financial Reports
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-50 border border-green-200 p-5 rounded-xl shadow text-center">
          <h2 className="text-gray-600 font-semibold">Total Income</h2>
          <p className="text-2xl font-bold text-green-600">${summary.income}</p>
        </div>

        <div className="bg-red-50 border border-red-200 p-5 rounded-xl shadow text-center">
          <h2 className="text-gray-600 font-semibold">Total Expense</h2>
          <p className="text-2xl font-bold text-red-600">${summary.expense}</p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 p-5 rounded-xl shadow text-center">
          <h2 className="text-gray-600 font-semibold">Net Balance</h2>
          <p
            className={`text-2xl font-bold ${
              summary.balance >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            ${summary.balance}
          </p>
        </div>
      </div>

      {/* Filter by Month */}
      <div className="mb-8 flex justify-center">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border border-green-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
        >
          <option value="">All Months</option>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(2025, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="bg-white border rounded-2xl p-6 shadow">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            Income & Expense Breakdown by Category
          </h3>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                  label
                >
                  {categoryData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-500">No expense data found</p>
          )}
        </div>

        {/* Bar Chart */}
        <div className="bg-white border rounded-2xl p-6 shadow">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            Monthly Income vs Expense
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyTotals}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#00C896" />
              <Bar dataKey="expense" fill="#FF6B6B" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Reports;
