import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../Context/AuthContext";
import logo from "../../assets/logo.svg";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/my-profile";

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then(() => {
        navigate(from, { replace: true });
        toast.success("Login Successful!");
      })
      .catch((err) => {
        if (err.code === "auth/invalid-email") {
          toast.error("Invalid email address!");
        } else if (err.code === "auth/user-disabled") {
          toast.error("This account has been disabled!");
        } else if (err.code === "auth/user-not-found") {
          toast.error("No account found with this email!");
        } else if (err.code === "auth/wrong-password") {
          toast.error("Incorrect password!");
        } else if (err.code === "auth/invalid-credential") {
          toast.error("Invalid email or password!");
        } else if (err.code === "auth/network-request-failed") {
          toast.error("Network error! Please check your internet connection.");
        } else {
          toast.error("Something went wrong! Try again later.");
        }
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        toast.success("Logged in with Google!");
        navigate("/my-profile");
      })
      .catch(() => {});
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#E6FFF5] to-white dark:from-neutral-900 dark:to-neutral-800 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md p-8 md:p-10 text-center border border-gray-100 dark:border-gray-700"
      >
        <title>Login Now | Finmate</title>

        {/* Logo */}
        <motion.img
          src={logo}
          alt="Finmate Logo"
          className="w-28 mx-auto mb-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        />

        {/* Heading */}
        <motion.h1
          className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Welcome Back
        </motion.h1>

        <motion.p
          className="text-gray-500 dark:text-gray-400 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          Login to your <span className="font-semibold text-[#00C896]">Finmate</span> account
        </motion.p>

        {/* Login Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          onSubmit={handleLogin}
          className="space-y-4 text-left"
        >
          <div>
            <label className="block text-gray-600 dark:text-gray-300 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="w-full border dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00C896]"
            />
          </div>

          <div className="relative">
            <label className="block text-gray-600 dark:text-gray-300 font-medium mb-1">Password</label>
            <input
              type={show ? "text" : "password"}
              name="password"
              required
              placeholder="Enter your password"
              className="w-full border dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00C896]"
            />
            <div
              className="absolute right-3 top-7/12 text-black dark:text-gray-200 cursor-pointer"
              onClick={() => setShow(!show)}
            >
              {show ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </div>
          </div>

          <div className="flex justify-end text-sm">
            <a href="#" className="text-[#00C896] font-medium hover:underline">
              Forgot Password?
            </a>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[#00C896] dark:bg-green-400 text-white font-semibold rounded-xl py-2 mt-3 hover:bg-[#00b682] dark:hover:bg-green-500 transition-all cursor-pointer"
          >
            Login
          </motion.button>
        </motion.form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
          <span className="px-3 text-gray-400 dark:text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
        </div>

        {/* Google Login */}
        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleGoogleSignIn}
          className="btn w-full flex items-center justify-center gap-2 rounded-2xl mt-2.5 text-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 shadow-sm hover:shadow-md transition-all"
        >
          <svg aria-label="Google logo" width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <g>
              <path fill="#fff" d="M0 0h512v512H0z" />
              <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
              <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
              <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
              <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
            </g>
          </svg>
          Continue with Google
        </motion.button>

        {/* Sign Up Link */}
        <motion.p
          className="text-gray-600 dark:text-gray-400 mt-6 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          Don’t have an account?{" "}
          <a href="/register" className="text-[#00C896] font-semibold hover:underline">
            Sign Up
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;
