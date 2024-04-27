import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/users/usersSlice";

const AddUser: React.FC = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
        setShowModal(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleAddUser = () => {
    dispatch(addUser({ id: Math.floor(Math.random() * 1000), name }));
    setName("");
    setSuccessMessage("User added successfully!");
  };

  const handleModalClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };

  return (
    <div className="mt-4 sm:flex sm:items-center sm:justify-between">
      <button
        onClick={() => setShowModal(true)}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
      >
        Create New User
      </button>
      {showModal && (
        <div
          className="fixed top-0 left-0 w-full h-full text-center bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleModalClose}
        >
          <div className="bg-slate-100 p-4 rounded shadow-md">
            {successMessage ? (
              <p className="text-green-800 mb-2">{successMessage}</p>
            ) : (
              <>
                <h2 className="text-lg font-bold mb-2">Add User</h2>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Please enter a name"
                  className="border border-gray-300 px-2 py-1 rounded mb-2"
                />
                <div className="flex justify-center">
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddUser}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Add
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddUser;
