import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";

const UpdateTransactions = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);

  // Fetch transaction by ID
  useEffect(() => {
    fetch(`https://finease-server-c7jy.onrender.com/transactions/${id}`)
      .then((res) => res.json())
      .then((data) => setTransaction(data))
      .catch((err) => console.error("Error loading transaction:", err));
  }, [id]);

  // Handle update
  const handleUpdateTransaction = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedTransaction = {
      type: form.type.value,
      category: form.category.value,
      amount: parseFloat(form.amount.value),
      description: form.description.value,
      date: form.date.value,
    };

    const res = await fetch(`https://finease-server-c7jy.onrender.com/transactions/update/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTransaction),
    });

    if (res.ok) {
      toast.success("✅ Transaction updated successfully!");
      navigate(`/transactions/${id}`);
    } else {
      toast.error("❌ Failed to update transaction!");
    }
  };

  if (!transaction) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-400 text-lg">
        Loading transaction data...
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-lg mx-auto bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Update Transaction
        </h2>

        <form onSubmit={handleUpdateTransaction} className="space-y-2">
          {/* Type */}
          <div className="form-control">
            <label className="block text-gray-700 font-semibold mb-2">
              Type
            </label>
            <select
              name="type"
              defaultValue={transaction.type}
              required
              className="select select-bordered w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            >
              <option value="">Select type</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>

          {/* Category */}
          <div className="form-control">
            <label className="block text-gray-700 font-semibold mb-2">
              Category
            </label>
            <select
              name="category"
              defaultValue={transaction.category}
              required
              className="select select-bordered w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            >
              <option value="">Select category</option>
              <option value="Salary">Salary</option>
              <option value="Food">Food</option>
              <option value="Shopping">Shopping</option>
              <option value="Transport">Transport</option>
              <option value="Bills">Bills</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Amount */}
          <div className="form-control">
            <label className="block text-gray-700 font-semibold mb-2">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              defaultValue={transaction.amount}
              placeholder="Enter amount"
              required
              className="input input-bordered w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="block text-gray-700 font-semibold mb-2">
              Description
            </label>
            <textarea
              name="description"
              defaultValue={transaction.description}
              placeholder="Short description"
              required
              className="textarea textarea-bordered w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none h-24 resize-none"
            ></textarea>
          </div>

          {/* Date */}
          <div className="form-control">
            <label className="block text-gray-700 font-semibold mb-2">
              Date
            </label>
            <input
              type="date"
              name="date"
              defaultValue={transaction.date?.slice(0, 10)}
              required
              className="input input-bordered w-full focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="btn bg-indigo-600 hover:bg-indigo-700 text-white w-full mt-4 text-lg font-semibold rounded-xl shadow-md transition-all"
          >
            Update Transaction
          </button>
        </form>

        <ToastContainer position="bottom-center" autoClose={2000} />
      </div>
    </div>
  );
};

export default UpdateTransactions;
