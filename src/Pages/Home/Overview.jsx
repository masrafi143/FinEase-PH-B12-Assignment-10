import React, { useEffect, useState } from "react";

const Overview = () => {
  const [data, setData] = useState({ income: 0, expense: 0 });

  useEffect(() => {
    // Example static data / Replace with your real fetch
    // fetch(`http://localhost:3000/transactions?email=${user.email}`)
    //   .then(res => res.json())
    //   .then(transactions => { ... })

    setData({ income: 25000, expense: 18000 });
  }, []);

  const balance = data.income - data.expense;

  return (
    <div className="md:max-w-4xl md:mx-auto mx-2 mt-8 p-6 bg-base-200 rounded-2xl shadow-lg text-center">
      <h2 className="text-2xl font-bold mb-6 text-primary">
        Financial Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 bg-success text-white rounded-xl">
          <h3 className="text-lg font-semibold">Total Income</h3>
          <p className="text-2xl font-bold">৳ {data.income.toLocaleString()}</p>
        </div>

        <div className="p-5 bg-error text-white rounded-xl">
          <h3 className="text-lg font-semibold">Total Expense</h3>
          <p className="text-2xl font-bold">৳ {data.expense.toLocaleString()}</p>
        </div>

        <div className="p-5 bg-info text-white rounded-xl">
          <h3 className="text-lg font-semibold">Current Balance</h3>
          <p className="text-2xl font-bold">৳ {balance.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
