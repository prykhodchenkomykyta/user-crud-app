import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  updateUser,
  deleteUser,
} from "../../redux/users/usersSlice";
import { RootState } from "../../redux/store";
import axios from "axios";
import AddUser from "../UI/AddUser";

const UsersList: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.usersSlice.users);
  const [editMode, setEditMode] = useState<{ [key: number]: boolean }>({});
  const [editedNames, setEditedNames] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users?start=0&_limit=10"
        );
        dispatch(fetchUsers(response.data));
      } catch (err) {
        console.log(err);
        alert("Error while fetching users!");
      }
    };

    fetchData();
  }, [dispatch]);

  const handleUpdateUser = (id: number) => {
    dispatch(updateUser({ id, name: editedNames[id] }));
    setEditMode({ ...editMode, [id]: false });
  };

  const handleDeleteUser = (id: number) => {
    dispatch(deleteUser(id));
  };

  return (
    <div className="container mx-auto p-4 px-4 sm:px-6 md:px-8 lg:px-10">
      <h1 className="text-2xl font-bold mb-4">List of Users</h1>
      <AddUser />
      <ul className="space-y-2">
        {users.map((user) => (
          <li
            key={user.id}
            className={`flex items-center justify-between border-b border-gray-300 py-2 ${
              editMode[user.id] ? "edited-name" : ""
            }`}
          >
            {editMode[user.id] ? (
              <input
                type="text"
                className={`${
                  editMode[user.id]
                    ? "outline-font-2 border-2 border-black"
                    : ""
                } ${editMode[user.id] ? "bg-slate-300" : ""} rounded-md pl-2`}
                value={editedNames[user.id] || user.name}
                onChange={(e) =>
                  setEditedNames({ ...editedNames, [user.id]: e.target.value })
                }
                placeholder="Enter new name"
              />
            ) : (
              <p>{user.name}</p>
            )}
            <div>
              {editMode[user.id] ? (
                <>
                  <button
                    onClick={() => handleUpdateUser(user.id)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() =>
                      setEditMode({ ...editMode, [user.id]: false })
                    }
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() =>
                      setEditMode({ ...editMode, [user.id]: true })
                    }
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
