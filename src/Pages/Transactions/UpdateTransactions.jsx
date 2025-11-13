import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";

const UpdateTransactions = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);

  // Fetch the transaction by ID
  useEffect(() => {
    fetch(`https://finease-api-server.vercel.app/transactions/${id}`)
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

    const res = await fetch(`https://finease-api-server.vercel.app/transactions/update/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTransaction),
    });

    if (res.ok) {
      toast("Transaction updated successfully!");
      navigate(`/transactions/${id}`); // go back to details page
    } else {
      toast("Failed to update transaction!");
    }
  };

  if (!transaction) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-300 text-lg">
        Loading transaction data...
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-10 bg-base-200 p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-5 text-primary">
        Update Transaction
      </h2>

      <form onSubmit={handleUpdateTransaction} className="space-y-4">
        {/* Type */}
        <div className="form-control">
          <label className="label font-medium">Type</label>
          <select
            name="type"
            className="select select-bordered"
            defaultValue={transaction.type}
            required
          >
            <option value="">Select type</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>

        {/* Category */}
        <div className="form-control">
          <label className="label font-medium">Category</label>
          <select
            name="category"
            className="select select-bordered"
            defaultValue={transaction.category}
            required
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
          <label className="label font-medium">Amount</label>
          <input
            type="number"
            name="amount"
            defaultValue={transaction.amount}
            placeholder="Enter amount"
            className="input input-bordered"
            required
          />
        </div>

        {/* Description */}
        <div className="form-control">
          <label className="label font-medium">Description</label>
          <textarea
            name="description"
            defaultValue={transaction.description}
            placeholder="Short description"
            className="textarea textarea-bordered"
            required
          ></textarea>
        </div>

        {/* Date */}
        <div className="form-control">
          <label className="label font-medium">Date</label>
          <input
            type="date"
            name="date"
            defaultValue={transaction.date?.slice(0, 10)}
            className="input input-bordered"
            required
          />
        </div>

        {/* Update Button */}
        <button type="submit" className="btn btn-primary w-full mt-3">
          Update Transaction
        </button>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default UpdateTransactions;
