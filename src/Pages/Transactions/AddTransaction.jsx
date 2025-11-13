import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";

const AddTransaction = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions]= useState([]);

  const handleAddTransaction = (e) => {
    e.preventDefault();

    const form = e.target;
    const type = form.type.value;
    const category = form.category.value;
    const amount = parseFloat(form.amount.value);
    const description = form.description.value;
    const date = form.date.value;
    const email = user?.email;
    const name = user?.displayName;

    const newTransaction = {
      type,
      category,
      amount,
      description,
      date,
      user_email: email,
      name,
    };

    // send to backend
    fetch("http://localhost:3000/transactions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Transaction added successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          //   form.reset();
          newTransaction._id = data.insertedId;
          const newTransactions = [...transactions, newTransaction];
          newTransactions.sort((a, b) => b.date - a.data);
          setTransactions(newTransactions);
        }
      });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-base-200 p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-5">
        Add New Transaction
      </h2>
      <form onSubmit={handleAddTransaction} className="space-y-4">
        {/* Type */}
        <div className="form-control">
          <label className="label font-medium">Type</label>
          <select name="type" className="select select-bordered" required>
            <option value="">Select type</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>

        {/* Category */}
        <div className="form-control">
          <label className="label font-medium">Category</label>
          <select name="category" className="select select-bordered" required>
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
            className="input input-bordered"
            required
          />
        </div>

        {/* Read-only fields */}
        <div className="form-control">
          <label className="label font-medium">User Name</label>
          <input
            type="text"
            name="username"
            className="input input-bordered"
            defaultValue={user?.displayName}
            readOnly
          />
        </div>

        <div className="form-control">
          <label className="label font-medium">User Email</label>
          <input
            type="email"
            name="email"
            className="input input-bordered"
            defaultValue={user?.email}
            readOnly
          />
        </div>

        {/* Submit button */}
        <button type="submit" className="btn btn-primary w-full mt-3">
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
