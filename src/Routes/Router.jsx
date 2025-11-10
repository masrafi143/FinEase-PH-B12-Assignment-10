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
import TransactionDetails from "../Pages/TransactionDetails";


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
        Component: AddTransaction
      },
      {
        path: 'my-transactions',
        Component: MyTransactions
      },
      {
        path: 'my-transactions/details/:id',
        Component: TransactionDetails
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
        Component: MyProfile
      }
    ],
},
{
  path: "*",
  Component: Error404,
},
]);