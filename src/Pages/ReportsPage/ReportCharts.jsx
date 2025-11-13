import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Fixed color mapping for categories
const CATEGORY_COLORS = {
  Food: "#FFBB28",
  Transport: "#0088FE",
  Shopping: "#00C49F",
  Bills: "#FF8042",
  Salary: "#AA46BE",
  Other: "#8884d8",
  Income: "#00C49F", // default income color
  Expense: "#FF8042", // default expense color
};

const ReportCharts = () => {
  const { user } = use(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    fetch(`https://finease-server-c7jy.onrender.com/transactions?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading transactions:", err);
        setLoading(false);
      });
  }, [user?.email]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner text-primary w-12 h-12"></span>
      </div>
    );

  // Income & expenses by category
  const incomeByCategory = [];
  const expenseByCategory = [];
  transactions.forEach((t) => {
    const amount = Number(t.amount) || 0;
    if (t.type === "Income") {
      const existing = incomeByCategory.find((e) => e.name === t.category);
      if (existing) existing.value += amount;
      else incomeByCategory.push({ name: t.category, value: amount });
    } else if (t.type === "Expense") {
      const existing = expenseByCategory.find((e) => e.name === t.category);
      if (existing) existing.value += amount;
      else expenseByCategory.push({ name: t.category, value: amount });
    }
  });

  // Monthly totals for bar chart
  const monthlyTotals = {};
  transactions.forEach((t) => {
    const month = new Date(t.date).toLocaleString("default", {
      month: "short",
    });
    if (!monthlyTotals[month]) monthlyTotals[month] = { Income: 0, Expense: 0 };
    if (t.type === "Income") monthlyTotals[month].Income += Number(t.amount);
    else if (t.type === "Expense")
      monthlyTotals[month].Expense += Number(t.amount);
  });
  const barData = Object.keys(monthlyTotals).map((m) => ({
    month: m,
    ...monthlyTotals[m],
  }));

  return (
    <div className="p-5 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-primary text-center mb-10">
        Financial Reports Dashboard
      </h2>

      {/* Two Pie Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Income Pie */}
        <div className="bg-base-100 rounded-xl shadow-md p-5">
          <h3 className="text-xl font-semibold text-center mb-4 text-green-600">
            Income Breakdown by Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={incomeByCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(1)}%`
                }
                outerRadius={120}
                dataKey="value"
              >
                {incomeByCategory.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      CATEGORY_COLORS[entry.name] || CATEGORY_COLORS["Income"]
                    }
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Expense Pie */}
        <div className="bg-base-100 rounded-xl shadow-md p-5">
          <h3 className="text-xl font-semibold text-center mb-4 text-red-600">
            Expense Breakdown by Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseByCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(1)}%`
                }
                outerRadius={120}
                dataKey="value"
              >
                {expenseByCategory.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      CATEGORY_COLORS[entry.name] || CATEGORY_COLORS["Expense"]
                    }
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Bar Chart */}
      <div className="bg-base-100 rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-center mb-4 text-blue-600">
          Monthly Income vs Expense
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Income" fill={CATEGORY_COLORS["Income"]} />
            <Bar dataKey="Expense" fill={CATEGORY_COLORS["Expense"]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ReportCharts;
