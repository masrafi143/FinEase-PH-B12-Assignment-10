import React, { useEffect, useState, use } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useLoaderData } from "react-router";

const TransactionDetails = () => {
  const { user } = use(AuthContext);
  const transactionData = useLoaderData();
  const [transaction] = useState(transactionData);
  const [categoryIncome, setCategoryIncome] = useState(0);
  const [categoryExpense, setCategoryExpense] = useState(0);

  useEffect(() => {
    if (transaction && user?.email) {
      fetch(
        `http://localhost:3000/transactions?email=${user.email}&category=${transaction.category}`
      )
        .then((res) => res.json())
        .then((data) => {
          // Separate totals for Income and Expense
          const incomeTotal = data
            .filter((t) => t.type === "Income")
            .reduce((sum, t) => sum + Number(t.amount), 0);

          const expenseTotal = data
            .filter((t) => t.type === "Expense")
            .reduce((sum, t) => sum + Number(t.amount), 0);

          setCategoryIncome(incomeTotal);
          setCategoryExpense(expenseTotal);
        });
    }
  }, [transaction, user]);

  if (!transaction) return <p>Loading transaction details...</p>;

  return (
    <div>
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

          {/* Category Summary Section */}
          <div className="mt-6 p-4 bg-indigo-50 rounded-lg text-center">
            <p className="text-gray-700 font-medium mb-2 text-2xl">
              Total in this Category
            </p>
            <p className="text-lg font-semibold text-green-600">
              Total Income: ${categoryIncome}
            </p>
            <p className="text-lg font-semibold text-red-600">
              Total Expenses: ${categoryExpense}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
