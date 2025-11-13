import React, { useEffect, useState, use } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useLoaderData } from "react-router";

const TransactionDetails = () => {
  const { user } = use(AuthContext);

  const transactionData = useLoaderData();
  const [transaction] = useState(transactionData);
  console.log("load ghgugf",transactionData);
  const [categoryTotal, setCategoryTotal] = useState(0);

  // Calculate total amount for this category easily
  useEffect(() => {
    if (transaction && user?.email) {
      fetch(
        `https://finease-api-server.vercel.app/transactions?email=${user.email}&category=${transaction.category}`
      )
        .then((res) => res.json())
        .then((data) => {
          setCategoryTotal(
            data.map((t) => Number(t.amount)).reduce((a, b) => a + b, 0)
          );
        });
    }
  }, [transaction, user]);

  if (!transaction) return <p>Loading transaction details...</p>;

  return (
    <div className="bg-base-200">
      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-center text-indigo-600">
          Transaction Details
        </h2>

        <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <span
              className={`px-4 py-1 rounded-full font-semibold text-white ${
                transaction.type === "Income" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {transaction.type}
            </span>
            <span className="text-gray-500 text-sm font-bold">
              {transaction.date
                ? new Date(transaction.date).toLocaleDateString()
                : "N/A"}
            </span>
          </div>

          <div className="mb-2">
            <p className="text-gray-600 font-medium">Category:</p>
            <p className="text-xl font-bold text-indigo-700">
              {transaction.category}
            </p>
          </div>

          <div className="mb-2">
            <p className="text-gray-600 font-medium">Description:</p>
            <p className="text-gray-800">
              {transaction.description || "No description"}
            </p>
          </div>

          <div className="mb-4">
            <p className="text-gray-600 font-medium">Amount:</p>
            <p
              className={`text-2xl font-bold ${
                transaction.type === "Income"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              ${transaction.amount}
            </p>
          </div>

          <div className="mt-6 p-4 bg-indigo-50 rounded-lg text-center">
            <p className="text-gray-700 font-medium">Total in this Category:</p>
            <p className="text-2xl font-bold text-indigo-700">
              ${categoryTotal}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
