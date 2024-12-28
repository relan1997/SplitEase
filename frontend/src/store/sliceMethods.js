import { createSlice } from "@reduxjs/toolkit";
import { loadState, saveState } from "./sessionMethods";

const initialState = {
  users: loadState("users", []),
  transactions: loadState("transactions", []),
};

export const sliceMethods = createSlice({
  name: "store",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      const item = action.payload.data;
      state.transactions = [...state.transactions, item];
      saveState("transactions", state.transactions);
    },

    addUser: (state, action) => {
      const item = action.payload.data;
      state.users = [...state.users, item];
      saveState("users", state.users);
    },

    removeTransaction: (state, action) => {
      state.transactions = state.transactions.filter(
        (item, ind) => ind !== action.payload.ind
      );
      saveState("transactions", state.transactions);
    },

    removeUser: (state, action) => {
      const itemsToRemove = action.payload.data;
      state.users = state.users.filter((item) => !itemsToRemove.includes(item));
      saveState("users", state.users);
    },

    updateTransaction: (state, action) => {
      state.transactions = state.transactions.map((item, ind) =>
        ind === action.payload.ind ? action.payload.data : item
      );
      saveState("transactions", state.transactions);
    },

    updateUser: (state, action) => {
      state.users = state.users.map((item, ind) =>
        ind === action.payload.ind ? action.payload.data : item
      );
      saveState("users", state.users);
    },
  },
});

export const {
  addTransaction,
  addUser,
  removeTransaction,
  removeUser,
  updateTransaction,
  updateUser,
} = sliceMethods.actions;

export default sliceMethods.reducer;
