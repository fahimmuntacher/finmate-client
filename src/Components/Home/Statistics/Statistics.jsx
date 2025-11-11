import React, { useContext, useEffect, useState } from "react";
import useAxios from "../../../Hooks/useAxios";
import CountUp from "react-countup";
import { AuthContext } from "../../../Context/AuthContext";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Statistics = () => {
  // const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure()
  const {user} = useContext(AuthContext)
  const [summary, setSummary] = useState({ income: 0, expense: 0, total: 0 });

  useEffect(() => {
    axiosSecure.get(`/transactions?email=${user.email}`).then((res) => {
      const data = res.data;
      const income = data
        .filter((t) => t.type === "Income")
        .reduce((acc, curr) => acc + Number(curr.amount), 0);
      const expense = data
        .filter((t) => t.type === "Expense")
        .reduce((acc, curr) => acc + Number(curr.amount), 0);
      setSummary({ income, expense, total: Math.max(income - expense, 0) });
    });
  }, [axiosSecure, user]);
  console.log(summary);
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="sm:border-r-4 sm:border-green-600 p-5 text-center space-y-3">
          <h2 className="text-gray-600 text-3xl font-semibold">Total Income</h2>
          <p className="text-4xl font-bold text-green-600">
            $
            <CountUp
              start={100}
              end={summary?.income}
              duration={3}
              separator=","
            ></CountUp>
          </p>
        </div>

        <div className=" sm:border-r-4 sm:border-red-600 p-5 space-y-3 text-center">
          <h2 className="text-gray-600 text-3xl font-semibold">
            Total Expense
          </h2>
          <p className="font-bold text-4xl text-red-600">
            $<CountUp start={100}
              end={summary?.expense}
              duration={3}
              separator=","></CountUp>
            </p>
        </div>

        <div className="p-5 text-center space-y-2.5">
          <h2 className="text-gray-600 text-3xl font-semibold">Net Balance</h2>
          <p className="font-bold text-4xl text-green-600">
            $<CountUp start={100}
              end={summary?.total}
              duration={3}
              separator=","></CountUp>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
