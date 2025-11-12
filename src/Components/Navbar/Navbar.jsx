import { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import "./navbar.css";
import { CiLogin } from "react-icons/ci";
import logo from "../../assets/logo.svg";
import ThemeController from "./ThemeController";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const links = (
    <>
      <li>
        <NavLink className="hover:text-green-500 dark:hover:text-green-400" to="/">Home</NavLink>
      </li>
      <li>
        <NavLink className="hover:text-green-500 dark:hover:text-green-400" to="/add-transaction">Add Transaction</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink className="hover:text-green-500 dark:hover:text-green-400" to="my-transactions">My Transactions</NavLink>
          </li>
          <li>
            <NavLink className="hover:text-green-500 dark:hover:text-green-400" to="/reports">Reports</NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink className="hover:text-green-500 dark:hover:text-green-400" to="/about-us">About Us</NavLink>
      </li>
    </>
  );

  return (
    <nav className="bg-white/10 backdrop-blur-md shadow-sm dark:bg-gray-800/70">
      <div className="navbar max-w-7xl mx-auto px-4 py-2">
        {/* Left */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-800 dark:text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-white dark:bg-gray-900 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="logo" className="w-15" />
            <h1 className="sm:block hidden text-2xl font-bold text-[#00C896] dark:text-green-400">
              Fin<span className="text-black dark:text-gray-200">mate</span>
            </h1>
          </Link>
        </div>

        {/* Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-4 text-lg font-medium text-gray-700 dark:text-gray-200">
            {links}
          </ul>
        </div>

        {/* Right */}
        <div className="navbar-end flex gap-2.5">
          <ThemeController />
          {user ? (
            <span className="text-gray-700 dark:text-gray-200 font-medium flex items-center gap-2.5">
              Hi,{" "}
              <span className="text-green-600 dark:text-green-400 font-bold">
                {user.displayName.split(" ")[0] || "User"}
              </span>
              <Link to="/my-profile">
                <img
                  src={
                    user.photoURL ||
                    "https://i.ibb.co/sJF5Gzmh/blank-profile-picture-973460-1280.webp"
                  }
                  alt="profile"
                  className="rounded-[50%] w-12 h-12 border-3 border-green-500 dark:border-green-400"
                />
              </Link>
            </span>
          ) : (
            <Link to="/register">
              <button className="px-4 py-2 text-xl font-semibold rounded-xl bg-[#00C896] dark:bg-green-400 text-white hover:bg-white hover:text-[#0a906e] dark:hover:text-green-700 border-2 flex items-center gap-2.5 cursor-pointer">
                <CiLogin /> Register
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
a