import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const MyProfile = () => {
  const { user, updateUserProfile, signOutUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    const displayName = e.target.name.value;
    const photoURL = e.target.photoURL.value;

    setLoading(true);
    try {
      await updateUserProfile(displayName, photoURL);
      setName(displayName);
      setPhoto(photoURL);
      toast.success("Profile updated successfully!");
      document.getElementById("my_modal_5").close(); // close modal
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      navigate("/");
      toast.warning("Signed out successfully");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md text-center border border-green-100">
        <h1 className="text-3xl font-bold text-green-500 mb-2.5">My Profile</h1>

        <img
          src={photo || "https://i.ibb.co/sJF5Gzmh/blank-profile-picture-973460-1280.webp"}
          alt="Profile"
          className="w-28 h-28 rounded-full mx-auto mb-5 border-4 border-green-500 shadow-md"
        />

        <div className="space-y-4 text-left">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Name</label>
            <input
              type="text"
              value={name}
              readOnly
              className="w-full border border-green-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Photo URL</label>
            <input
              type="text"
              value={photo}
              readOnly
              className="w-full border border-green-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email</label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full border bg-gray-100 rounded-lg px-3 py-2 text-gray-500 cursor-not-allowed"
            />
          </div>
        </div>

        <button
          onClick={() => document.getElementById("my_modal_5").showModal()}
          className="w-full text-xl bg-[#00C896] border-2 border-[#00C896] text-white font-semibold mt-4 py-2 rounded-lg shadow-md hover:bg-white hover:text-green-600 transition-all duration-200"
        >
          Update Profile
        </button>

        <button
          onClick={handleSignOut}
          className="w-full border border-red-400 text-red-500 font-semibold py-2 rounded-lg hover:bg-red-50 transition-all duration-200 mt-4"
        >
          Log Out
        </button>

        {/* Update Profile Modal */}
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-white shadow-xl border rounded-2xl">
            <h3 className="font-bold text-2xl text-center mb-4 text-gray-800">
              Update Profile
            </h3>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block font-semibold text-gray-600 mb-1">Name</label>
                <input
                  type="text"
                  defaultValue={name}
                  name="name"
                  className="input input-bordered w-full bg-gray-50 ring-2 ring-green-300 focus:ring-green-600 text-lg"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-600 mb-1">Photo URL</label>
                <input
                  type="text"
                  defaultValue={photo}
                  name="photoURL"
                  className="input input-bordered w-full bg-gray-50 ring-2 ring-green-300 focus:ring-green-600 text-xl"
                  placeholder="Paste your photo URL"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => document.getElementById("my_modal_5").close()}
                  className="border-2 border-green-400 text-lg text-green-600 bg-gray-50 py-2.5 px-3.5 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>

                <button type="submit" className="border-2 border-green-400 text-lg text-white font-semibold bg-[#00C896] py-2.5 px-3.5 rounded-xl cursor-pointer" disabled={loading}>
                  {loading ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </motion.div>
  );
};

export default MyProfile;
