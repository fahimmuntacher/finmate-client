import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import logo from "../../assets/logo.svg";
import { AuthContext } from "../../Context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import {  useLocation, useNavigate } from "react-router";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [ onChangePass, setOnChangePass] = useState("");
  const [passErr, setPassErr] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/my-profile";
   

  const handleCreateUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoURL = e.target.photoURL.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (password.length < 6) {
    setPassErr('Password must be at least 6 characters long.');

  }
    createUser(email, password)
      .then((res) => {
        console.log(res);
        updateUserProfile(name, photoURL)
          .then((res) => {
            console.log(res);
            navigate(from, { replace: true });
            toast.success("Account Created Successfully")
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const googleSignIn = () => {
    signInWithGoogle()
    .then(res => {
        console.log(res);
        toast.success("Log in Successfully!", {
          position: "bottom-right"
        })
        navigate('/my-profile');
    })
    .catch(err => {
        console.log(err);
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#E6FFF5] to-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 md:p-10 text-center border border-gray-100"
      >
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
          className="text-3xl font-bold text-gray-800 mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Create Your Account
        </motion.h1>

        <motion.p
          className="text-gray-500 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          Welcome to{" "}
          <span className="font-semibold text-[#00C896]">Finmate</span> — track
          your finances smartly!
        </motion.p>

        {/* Register Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="space-y-4 text-left"
          onSubmit={handleCreateUser}
        >
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="Enter your name"
              className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00C896]"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Photo URL
            </label>
            <input
              type="text"
              name="photoURL"
              required
              placeholder="Enter valid photo URL"
              className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00C896]"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00C896]"
            />
          </div>

          <div className="relative">
            <label className="block text-gray-600 font-medium mb-1">
              Password
            </label>
            <input
              type={show ? "text" : "password"}
              name="password"
              onChange={(e) =>setOnChangePass(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00C896]"
            />
            <p className="font-semibold text-lg text-red-500">{passErr}</p>
            {/* Eye Icon */}
            <div
              className="absolute right-3 top-7/12 text-black cursor-pointer"
              onClick={() => setShow(!show)}
            >
              {show ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[#00C896] text-white font-semibold rounded-xl py-2 mt-3 hover:bg-[#00b682] transition-all cursor-pointer"
          >
            Register
          </motion.button>
        </motion.form>

        {/* divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          whileTap={{ scale: 0.97 }}
          onClick={googleSignIn}
          className="btn w-full flex items-center justify-center gap-2 rounded-2xl mt-2.5 text-lg bg-white text-gray-700 shadow-sm hover:shadow-md transition-all"
        >
          <svg
            aria-label="Google logo"
            width="18"
            height="18"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path fill="#fff" d="M0 0h512v512H0z" />
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              />
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              />
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              />
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              />
            </g>
          </svg>
          Login with Google
        </motion.button>

        {/* Already have account */}
        <motion.p
          className="text-gray-600 mt-6 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          Already have an account?{" "}
          <a
            href="/login"
            className="text-[#00C896] font-semibold hover:underline"
          >
            Login
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Register;
