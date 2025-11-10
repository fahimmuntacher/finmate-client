import React from 'react';

const UpdateModal = ({modalId, deafult, updateTransaction, type, setType, category, setCategory, amount, setAmount, description, setDescription, date, setDate, loading  }) => {
    return (
        <div>
            <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-white shadow-xl border rounded-2xl">
            <h3 className="font-bold text-2xl text-center mb-4 text-gray-800">
              Update Transaction
            </h3>

            <form onSubmit={updateTransaction} className="space-y-4">
              {/* Type */}
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Type
                </label>
                <select
                  defaultValue={deafult?.type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="Income">Income</option>
                  <option value="Expense">Expense</option>
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Category
                </label>
                <select
                  defaultValue={deafult?.category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Select Category</option>
                  {type === "Income" ? (
                    <>
                      <option value="Salary">Salary</option>
                      <option value="Business">Business</option>
                      <option value="Investment">Investment</option>
                    </>
                  ) : (
                    <>
                      <option value="Food">Food</option>
                      <option value="Transport">Transport</option>
                      <option value="Shopping">Shopping</option>
                      <option value="Bills">Bills</option>
                    </>
                  )}
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  defaultValue={deafult?.amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="input input-bordered w-full bg-gray-50 focus:ring-2 focus:ring-[#00C896] text-gray-800 text-base"
                  placeholder="Enter amount"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={deafult?.description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="3"
                  className="textarea textarea-bordered w-full bg-gray-50 focus:ring-2 focus:ring-[#00C896] text-gray-800 text-base"
                  placeholder="Write description"
                ></textarea>
              </div>

              {/* Date */}
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  defaultValue={deafult?.date}
                  onChange={(e) => setDate(e.target.value)}
                  className="input input-bordered w-full bg-gray-50 focus:ring-2 focus:ring-[#00C896] text-gray-800 text-base"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => document.getElementById("my_modal_5").close()}
                  className="border border-[#00C896] text-[#00C896] bg-white py-2.5 px-4 rounded-xl font-medium hover:bg-green-50 transition-all duration-200"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#00C896] text-white font-semibold py-2.5 px-6 rounded-xl shadow hover:bg-green-700 transition-all duration-200 disabled:opacity-60"
                >
                  {loading ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </dialog>
        </div>
    );
};

export default UpdateModal;
