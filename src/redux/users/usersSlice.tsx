import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/types";

interface UsersState {
  users: IUser[];
}

const initialState: UsersState = {
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchUsers(state, action: PayloadAction<IUser[]>) {
      state.users = action.payload;
    },
    addUser(state, action: PayloadAction<IUser>) {
      state.users.push(action.payload);
    },
    updateUser(state, action: PayloadAction<IUser>) {
      const updatedUser = action.payload;
      const index = state.users.findIndex((user) => user.id === updatedUser.id);
      if (index !== -1) {
        state.users[index] = updatedUser;
      }
    },
    deleteUser(state, action: PayloadAction<number>) {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
});

export const { fetchUsers, addUser, updateUser, deleteUser } =
  usersSlice.actions;
export default usersSlice.reducer;
