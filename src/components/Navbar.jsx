import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import fineaseLogo from "/fineaseLogo.png";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const { user, dbUser, logOut } = useContext(AuthContext);

  const demoUser = {
    image:
      "https://imgs.search.brave.com/wsziTmKjC8sgP9UIcqExIg7psh37zxr2o8v1yUKRdwU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZs/YXRpY29uLmNvbS8x/MjgvMTExNDQvMTEx/NDQ2MTYucG5n",
  };

  const profileImage = dbUser?.image || demoUser.image;
  const displayName = dbUser?.name || "No Name";
  const displayEmail = dbUser?.email || "No Email";

  const handleLogout = () => {
    logOut().catch((err) => console.log(err));
  };

  const links = (
    <div className="nav-links space-x-6 text-primary font-semibold">
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/add-transactions"}>Add Transaction</NavLink>
      <NavLink to={"/my-transactions"}>My Transaction</NavLink>
      <NavLink to={"/profile"}>My Profile</NavLink>
      <NavLink to={"/reports"}>Reports</NavLink>
    </div>
  );

  return (
    <nav className="bg-base-300 shadow-sm">
      <div className="navbar w-11/12 mx-auto">
        <div className="navbar-start">
          <Link to={"/"} className="flex items-center gap-2 text-xl text-secondary">
            <img src={fineaseLogo} className="w-10 h-[35px]" alt="" />
            <h2 className="font-bold">
              Fin<span className="text-primary">Ease</span>
            </h2>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        <div className="navbar-end">
          <div className="flex flex-col md:flex-row items-center gap-3">
            {user ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="m-1">
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="rounded-full h-[50px] w-[50px] object-cover"
                  />
                </div>
                <ul
                  tabIndex="-1"
                  className="dropdown-content menu bg-[#f7fee7] rounded-box z-2 w-52 p-2 shadow-sm"
                >
                  <p className="font-bold text-center text-secondary">{displayName}</p>
                  <p className="text-center text-sm text-gray-600">{displayEmail}</p>
                  <button
                    onClick={handleLogout}
                    className="btn bg-primary text-white mt-3 w-fit mx-auto rounded-4xl"
                  >
                    Logout
                  </button>
                </ul>
              </div>
            ) : (
              <>
                <Link
                  to={"/login"}
                  className="btn bg-primary text-white hover:bg-secondary"
                >
                  Login
                </Link>
                <Link
                  to={"/register"}
                  className="btn bg-secondary text-white hover:bg-primary hover:border-secondary"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <hr className="text-primary" />
    </nav>
  );
};

export default Navbar;
