import { createSlice} from "@reduxjs/toolkit";
import { loadState, saveState } from "./sessionMethods";

const initialState = {
  transactions: loadState(process.env.SESSION_KEY, []),
};

export  const sliceMethods = createSlice({
  name: "store",
  initialState,
  reducers: {
    addToState: (state, action) => {
      const item = action.payload;
      state.transactions.push(item);
      saveState(process.env.SESSION_KEY, state.transactions);
    },
    removeFromState: (state, action) => {
       state.transactions= state.transactions.filter(
        (item) => item.id !== action.payload
      );
      saveState(process.env.SESSION_KEY, state.transactions);
    },
    updateState: (state, action) => {
        state.transactions = state.transactions.map((item) =>
          item.id === action.payload.id ? action.payload.data : item
        );
        saveState(process.env.SESSION_KEY, state.transactions);
      },
  },
});

export const { addToState, removeFromState, updateState } = sliceMethods.actions;

export default sliceMethods.reducer;