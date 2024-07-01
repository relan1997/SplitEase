import { createSlice} from "@reduxjs/toolkit";
import { loadState, saveState } from "./sessionMethods";

const initialState = {
  transactions: loadState('INDT20WC_290624', []),
};

export  const sliceMethods = createSlice({
  name: "store",
  initialState,
  reducers: {
    addToState: (state, action) => {
      const item = action.payload.data;
      state.transactions =[...state.transactions,item]
      saveState('INDT20WC_290624', state.transactions);
    },
    removeFromState: (state, action) => {
       state.transactions= state.transactions.filter(
        (item) => item.id !== action.payload.data
      );
      saveState('INDT20WC_290624', state.transactions);
    },
    updateState: (state, action) => {
        state.transactions = state.transactions.map((item) =>
          item.id === action.payload.id ? action.payload.data : item
        );
        saveState('INDT20WC_290624', state.transactions);
      },
  },
});

export const { addToState, removeFromState, updateState } = sliceMethods.actions;

export default sliceMethods.reducer;