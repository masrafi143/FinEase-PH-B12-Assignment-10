import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const Overview = () => {
  const { user } = use(AuthContext);
  const [data, setData] = useState({ income: 0, expense: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://finease-server-c7jy.onrender.com/transactions?email=${user?.email}`)
      .then((res) => res.json())
      .then((transactions) => {
        let totalIncome = 0;
        let totalExpense = 0;

        transactions.forEach((t) => {
          const amount = Number(t.amount) || 0;
          if (t.type === "Income") totalIncome += amount;
          else if (t.type === "Expense") totalExpense += amount;
        });

        setData({ income: totalIncome, expense: totalExpense });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load transactions:", err);
        setLoading(false);
      });
  }, [user?.email]);

  const balance = data.income - data.expense;

  if (user && loading)
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-base-200 rounded-2xl shadow-lg text-center">
      <h2 className="text-2xl font-bold text-primary mb-6">
        Financial Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-lg font-semibold">
        <div className="bg-success text-white rounded-xl p-5 shadow-md">
          <h3>Total Income</h3>
          <p className="text-2xl mt-2">৳ {data.income.toLocaleString()}</p>
        </div>

        <div className="bg-error text-white rounded-xl p-5 shadow-md">
          <h3>Total Expense</h3>
          <p className="text-2xl mt-2">৳ {data.expense.toLocaleString()}</p>
        </div>

        <div
          className={`rounded-xl p-5 shadow-md ${
            balance >= 0 ? "bg-primary text-white" : "bg-warning text-black"
          }`}
        >
          <h3>Current Balance</h3>
          <p className="text-2xl mt-2">৳ {balance.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
