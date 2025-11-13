import React, { useContext } from "react";
import { Outlet } from "react-router";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { AuthContext } from "../../provider/AuthProvider";

const HomeLayout = () => {
  const { dark } = useContext(AuthContext);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        dark
          ? "bg-gray-950"
          : "bg-[#f9fafb] text-gray-800"
      }`}
    >
      <Navbar />
        <Outlet />
      <Footer />
    </div>
  );
};

export default HomeLayout;
