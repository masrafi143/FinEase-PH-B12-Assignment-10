import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";
import { Link } from "react-router";

const MyTransactions = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [sortType, setSortType] = useState("default"); // 'default' | 'date' | 'amount'
  const [loading, setLoading] = useState(true); // 🔹 Added loading state

  // 🟢 Fetch transactions based on sortType
  useEffect(() => {
    if (!user?.email) return;

    setLoading(true); // start loading before fetch

    let url = `https://finease-server-c7jy.onrender.com/transactions?email=${user.email}`;
    if (sortType === "date") {
      url = `https://finease-server-c7jy.onrender.com/transactions-date-sorted?email=${user.email}`;
    } else if (sortType === "amount") {
      url = `https://finease-server-c7jy.onrender.com/transactions-amount-sorted?email=${user.email}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
      })
      .catch((err) => console.error("Error fetching transactions:", err))
      .finally(() => setLoading(false)); // stop loading in all cases
  }, [user?.email, sortType]);

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
        fetch(`https://finease-server-c7jy.onrender.com/transactions/${_id}`, {
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

  // 🟣 Loading spinner while fetching data
  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner text-primary w-12 h-12"></span>
      </div>
    );

  return (
    <div className="p-6">
      <div className="flex justify-between md:px-10 items-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
          My Transactions: {transactions.length}
        </h2>

        {/* Sorting Dropdown */}
        <div className="dropdown dropdown-bottom dropdown-end">
          <div tabIndex={0} role="button" className="btn m-1">
            Sort by ⬇️
          </div>
          <ul
            tabIndex="-1"
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li>
              <button onClick={() => setSortType("date")}>📅 Date (latest)</button>
            </li>
            <li>
              <button onClick={() => setSortType("amount")}>💰 Amount (Highest)</button>
            </li>
            <li>
              <button onClick={() => setSortType("default")}>🔁 Default</button>
            </li>
          </ul>
        </div>
      </div>

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
                <Link
                  to={`/transactions/update/${t._id}`}
                  className="btn btn-sm btn-outline btn-primary"
                >
                  Update
                </Link>
                <Link
                  to={`/transactions/${t._id}`}
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
