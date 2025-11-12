import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import logo from "../../assets/logo.svg";
import { AuthContext } from "../../Context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import Spinner from "../../Components/Spinner/Spinner";


const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } = useContext(AuthContext);
  const [passErr, setPassErr] = useState("");
  
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  

  const handleCreateUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoURL = e.target.photoURL.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (password.length < 6) {
      setPassErr("Password must be at least 6 characters long.");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setPassErr("Password must contain at least one uppercase letter.");
      return;
    } else if (!/[a-z]/.test(password)) {
      setPassErr("Password must contain at least one lowercase letter.");
      return;
    } else {
      setPassErr("");
    }

    createUser(email, password)
      .then(() => {
        updateUserProfile(name, photoURL)
          .then(() => {
            navigate("/my-profile");
            toast.success("Account Created Successfully");
          })
          .catch(() => {});
      })
      .catch((err) => {
        if (err.code === "auth/email-already-in-use") {
          toast.warning("User already exists! Try logging in.");
        } else if (err.code === "auth/invalid-email") {
          toast.error("Invalid email format!");
        } else if (err.code === "auth/weak-password") {
          toast.error("Password is too weak! Use a stronger one.");
        } else if (err.code === "auth/missing-password") {
          toast.error("Please enter your password!");
        } else if (err.code === "auth/network-request-failed") {
          toast.error("Network error! Check your internet connection.");
        } else {
          toast.error("Something went wrong! Please try again later.");
        }
      });
  };

  const googleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        toast.success("Log in Successfully!", { position: "bottom-right" });
        navigate("/my-profile");
      })
      .catch(() => {});
  };

  if(loading){
    return <Spinner></Spinner>
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#E6FFF5] to-white dark:from-neutral-900 dark:to-neutral-800 px-4">
      <title>Register Now | Finmate</title>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md p-8 md:p-10 text-center border border-gray-100 dark:border-gray-700"
      >
        <motion.img
          src={logo}
          alt="Finmate Logo"
          className="w-28 mx-auto mb-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        />

        <motion.h1
          className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Create Your Account
        </motion.h1>

        <motion.p
          className="text-gray-500 dark:text-gray-400 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          Welcome to <span className="font-semibold text-[#00C896]">Finmate</span> — track your finances smartly!
        </motion.p>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="space-y-4 text-left"
          onSubmit={handleCreateUser}
        >
          <div>
            <label className="block text-gray-600 dark:text-gray-300 font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Enter your name"
              className="w-full border dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00C896]"
            />
          </div>

          <div>
            <label className="block text-gray-600 dark:text-gray-300 font-medium mb-1">Photo URL</label>
            <input
              type="text"
              name="photoURL"
              required
              placeholder="Enter valid photo URL"
              className="w-full border dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00C896]"
            />
          </div>

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
            <div className="absolute right-3 top-7/12 text-black dark:text-gray-200 cursor-pointer" onClick={() => setShow(!show)}>
              {show ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </div>
          </div>
          {passErr && <p className="font-semibold text-red-500">{passErr}</p>}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[#00C896] dark:bg-green-400 text-white font-semibold rounded-xl py-2 mt-3 hover:bg-[#00b682] dark:hover:bg-green-500 transition-all cursor-pointer"
          >
            Register
          </motion.button>
        </motion.form>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
          <span className="px-3 text-gray-400 dark:text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
        </div>

        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          whileTap={{ scale: 0.97 }}
          onClick={googleSignIn}
          className="btn w-full flex items-center justify-center gap-2 rounded-2xl mt-2.5 text-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 shadow-sm hover:shadow-md transition-all"
        >
          {/* Google SVG logo remains same */}
          <svg aria-label="Google logo" width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <g>
              <path fill="#fff" d="M0 0h512v512H0z" />
              <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
              <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
              <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
              <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
            </g>
          </svg>
          Login with Google
        </motion.button>

        <motion.p
          className="text-gray-600 dark:text-gray-400 mt-6 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          Already have an account?{" "}
          <a href="/login" className="text-[#00C896] font-semibold hover:underline">
            Login
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Register;
