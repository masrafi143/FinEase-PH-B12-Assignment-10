import { createBrowserRouter } from "react-router";
import { Component } from "react";
import HomeLayout from "../layout/HomeLayout/HomeLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";
import Error404 from "../Pages/Error404";
import MyProfile from "../Pages/Profile/MyProfile";
import AddTransaction from "../Pages/Transactions/AddTransaction";
import MyTransaction from "../Pages/Transactions/MyTransaction";


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
        path: 'add-transaction',
        Component: AddTransaction
      },
      {
        path: 'my-transaction',
        Component: MyTransaction
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