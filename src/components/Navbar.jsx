import React, { use } from "react";
import { Link, NavLink } from "react-router";
import fineaseLogo from '/fineaseLogo.png'
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const {user, photoUrl, logOut} = use(AuthContext);
    const handleLogout = () => {
    logOut()
    .then(()=>{})
    .catch(error=>{
      console.log(error)
    })
  }
  const links = (
    <> 
    <div className="nav-links space-x-6 text-primary font-semibold">
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/add-transactions"}>Add Transaction</NavLink>
      <NavLink to={"/my-transactions"}>My Transaction</NavLink>
      <NavLink to={"/profile"}>My Profile</NavLink>
      <NavLink to={"/reports"}>Reports</NavLink>
    </div>
    </>
  );
  return (
    <div>
      <nav  className=" bg-base-300 shadow-sm">
        <div  className="navbar w-11/12 mx-auto">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-9999 mt-3 w-52 p-2 shadow fixed top-[70px] left-4"
              >
                {links}
              </ul>
            </div>
            <Link to={'/'} className="flex items-center gap-2 text-xl text-secondary">
                <img src={fineaseLogo} className="w-10 h-[35px]" alt="" />
                <h2 className="font-bold">Fin<span className="text-primary">Ease</span></h2>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{links}</ul>
          </div>
          <div className="navbar-end">
            <div className="flex flex-col md:flex-row items-center gap-3">
              {
                user ? <>
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="m-1">
                    <img src={user.photoURL? user.photoURL : photoUrl? `${photoUrl}` : 'https://imgs.search.brave.com/wsziTmKjC8sgP9UIcqExIg7psh37zxr2o8v1yUKRdwU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZs/YXRpY29uLmNvbS8x/MjgvMTExNDQvMTEx/NDQ2MTYucG5n'} alt="" className="rounded-full h-[50px] dropdown"/>
                  </div>
                  <ul tabIndex="-1" className="dropdown-content menu bg-[#f7fee7] rounded-box z-2 w-52 p-2 shadow-sm">
                    <p className="font-bold text-center text-secondary">{user.displayName}</p>
                    <p className="text-center">{user.email}</p>
                    <button onClick={handleLogout} className="btn bg-primary text-white mt-3 w-fit mx-auto rounded-4xl">Logout</button> 
                  </ul>
              </div>
                </>
                : <>                
                <Link to={'/login'} className="btn bg-primary text-white hover:bg-secondary">Login</Link>
                <Link to={'/register'} className="btn bg-secondary text-white hover:bg-primary hover:border-secondary">Register</Link>
                </>
              }
            </div>
          </div>
        </div>
      </nav>
      <hr className="text-primary"/>
    </div>
  );
};

export default Navbar;