import { createBrowserRouter } from "react-router";
import { Component } from "react";
import HomeLayout from "../layout/HomeLayout/HomeLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import Error404 from "../Pages/Error404";
import MyProfile from "../Pages/Profile/MyProfile";
import AddTransaction from "../Pages/Transactions/AddTransaction";
import MyTransactions from "../Pages/Transactions/MyTransactions";
import TransactionDetails from "../Pages/Transactions/TransactionDetails";
import UpdateTransactions from "../Pages/Transactions/UpdateTransactions";
import ReportCharts from "../Pages/ReportsPage/ReportCharts";
import PrivateRoutes from "./PrivateRoutes";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'add-transactions',
        element: <PrivateRoutes>
          <AddTransaction/>
        </PrivateRoutes>
      },
      {
        path: 'my-transactions',
        element: <PrivateRoutes>
          <MyTransactions/>
        </PrivateRoutes>
      },
      {
        path: 'transactions/:id',
        element: <PrivateRoutes>
          <TransactionDetails/>
        </PrivateRoutes>,
        loader: ({ params }) => fetch(`http://localhost:3000/transactions/${params.id}`)
      },
      {
        path: 'transactions/update/:id',
        element: <PrivateRoutes>
          <UpdateTransactions/>
        </PrivateRoutes>
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component:Register,
      },
      {
        path: 'profile',
        element: <PrivateRoutes>
          <MyProfile/>
        </PrivateRoutes>
      },
      {
        path: 'reports',
        element: <PrivateRoutes>
          <ReportCharts/>
        </PrivateRoutes>
      }
    ],
},
{
  path: "*",
  Component: Error404,
},
]);