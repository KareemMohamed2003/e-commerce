import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  isItemChanged: false,
  isItemPending: null,
  itemPending: null,
  cart: [],
  message: null
};
export const cartSlice: any = createSlice({
  name: "CartSlice",
  reducers: {
    resetCart: (state, action) => {
      return initialState;
    },
    checkout: (state, action) => {
      return {
        ...initialState,
        checkout: true,
        message: action.payload,
        isItemPending: true,
      };
    },

    pendingItem: (state, action) => {
      if (action.payload === "pending")
        return {
          ...state,
          isItemPending: true,
          isItemChanged: false,
        };

    },
    dispatchCart: (state, action) => {
      if (action.payload.status === "success")
        return {
          ...state,
          isItemChanged: true,
          isItemPending: false,
          message: action.payload.message,
        };
      else {
        return {
          ...state,
          isItemChanged: true,
          isItemPending: false,
          message: "something went wrong",
        };
      }
    },

    terminateProcess: (state, action) => {
      if (action.payload === "terminate")
        return {
          ...state,
          isItemChanged: false,
          isItemPending: null,
          itemPending: null,

          message: null
        };
    },
    getCart: (state, action) => {
      const cart: any = action.payload;

      return {
        ...state,
        cart,
      };
    },
  },

  initialState,
});

export const {
  resetCart,
  pendingItem,
  dispatchCart,
  checkout,
  terminateProcess,
  getCart,
} = cartSlice.actions;
export default cartSlice.reducer;
