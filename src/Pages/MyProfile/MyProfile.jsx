import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const MyProfile = () => {
  const { user, updateUserProfile, signOutUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const navigate = useNavigate()

  const handleUpdate = (e) => {
    e.preventDefault();
    const displayName = e.target.name.value;
    const photoURL = e.target.photoURL.value;
    console.log(displayName, photoURL);

    updateUserProfile(displayName, photoURL)
      .then((res) => {
        console.log(res);
        setName(displayName);
        setPhoto(photoURL);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSignOut = () => {
    signOutUser()
    .then(res => {
      console.log(res);
      navigate("/")
      toast.warning("Sign Out Succesfully")
      
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-indigo-100 via-white to-indigo-200 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md text-center border border-indigo-100">
        <h1 className="text-3xl font-bold text-green-500 mb-2.5">My Profile</h1>

        <img
          src={photo || "https://i.ibb.co.com/sJF5Gzmh/blank-profile-picture-973460-1280.webp"}
          alt="Profile"
          className="w-28 h-28 rounded-full mx-auto mb-5 border-4 border-green-500 shadow-md"
        />

        <form className="space-y-4 text-left">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Name
            </label>
            <input
              type="text"
              Value={name}
              readOnly
              name="name"
              className="w-full border border-green-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Photo URL
            </label>
            <input
              type="text"
              Value={photo}
              readOnly
              name="photoURL"
              className="w-full border border-green-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full border bg-gray-100 rounded-lg px-3 py-2 text-gray-500 cursor-not-allowed"
            />
          </div>
          <button className="w-full bg-green-600 border-2 border-green-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-white hover:text-green-600 transition-all duration-200 cursor-pointer">
            Update Profile
          </button>
        </form>
        {/* Sign Out Button */}
        <div className="mt-4 space-y-3 border-t-2 border-gray-400">
          <button onClick={handleSignOut} className="w-full border border-red-400 text-red-500 font-semibold py-2 rounded-lg hover:bg-red-50 transition-all duration-200 mt-4">
            Sign Out
          </button>
        </div>

        {/* Buttons Modal */}
        

        <button
          className="btn"
          onClick={() => document.getElementById("my_modal_5").showModal()}
        >
          open modal
        </button>
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">
              Press ESC key or click the button below to close
            </p>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </motion.div>
  );
};

export default MyProfile;
