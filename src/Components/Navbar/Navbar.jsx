import { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import "./navbar.css";
import { CiLogin } from "react-icons/ci";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/add-transaction">Add Transaction</NavLink>
      </li>
      <li>
        <NavLink to="/about-us">About Us</NavLink>
      </li>
    </>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto px-4 py-2">
        {/* Left */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
              className="menu menu-sm dropdown-content bg-white rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-[#00C896]">
            Fin<span className="text-black">mate</span>
          </Link>
        </div>

        {/* Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-4 text-lg font-medium text-gray-700">
            {links}
          </ul>
        </div>

        {/* Right */}
        <div className="navbar-end flex gap-2.5">
          {user ? (
            <span className="text-gray-700 font-medium flex items-center gap-2.5">
              Hi, <span className="text-green-600 font-bold">{user.displayName.split(" ")[0] || "User"}</span>
              <Link to="/my-profile"><img src={user.photoURL} alt=""  className=" rounded-[50%] w-12 h-12 border-3 border-green-500"/></Link>
            </span>
          ) : (
            <>
             
              <Link to="/register">
                <button className="px-4 py-2 text-xl font-sembold rounded-xl bg-[#00C896] text-white hover:bg-white hover:text-[#0a906e] border-2  flex items-center gap-2.5 cursor-pointer">
                  <CiLogin></CiLogin> Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
