import React, { use, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";
import { Link } from "react-router";

const MyTransactions = () => {
  const { user } = use(AuthContext);
  const [transactions, setTransactions] = useState([]);
  // console.log('my-transaction email', user.email)
  // 🟢 Fetch logged-in user's transactions
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/transactions?email=${user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          setTransactions(data);
          console.log("User transactions:", data);
        });
    }
  }, [user?.email]);

  // 🔴 Delete a transaction
  const handleDeleteTransaction = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This transaction will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/transactions/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Transaction removed successfully.",
                icon: "success",
              });
              const remaining = transactions.filter((t) => t._id !== _id);
              setTransactions(remaining);
            }
          });
      }
    });
  };


  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">
        My Transactions: {transactions.length}
      </h2>

      {/* Card Layout */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {transactions.map((t) => (
          <div
            key={t._id}
            className="card bg-base-200 shadow-xl border border-gray-700"
          >
            <div className="card-body">
              <h2 className="card-title">
                {t.type === "Income" ? (
                  <span className="badge badge-success">Income</span>
                ) : (
                  <span className="badge badge-error">Expense</span>
                )}
              </h2>
              <p>
                <b>Category:</b> {t.category}
              </p>
              <p>
                <b>Amount:</b> ${t.amount}
              </p>
              <p>
                <b>Date:</b>{" "}
                {t.date ? new Date(t.date).toLocaleDateString() : "N/A"}
              </p>

              <div className="card-actions justify-end mt-3">
                <button
                  // onClick={() => handleUpdate(t._id)}
                  className="btn btn-sm btn-outline btn-primary"
                >
                  Update
                </button>
                <Link
                to={`details/${t._id}`}                
                  className="btn btn-sm btn-outline btn-info"
                >
                  View
                </Link>
                <button
                  onClick={() => handleDeleteTransaction(t._id)}
                  className="btn btn-sm btn-outline btn-error"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* if no transactions */}
        {transactions.length === 0 && (
          <p className="text-center col-span-full text-gray-400">
            No transactions found.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyTransactions;
