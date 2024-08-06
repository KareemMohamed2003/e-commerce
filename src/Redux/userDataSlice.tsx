import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  userId: null,
  errorMessage: false,
};

export const userDataSlice: any = createSlice({
  name: "userDataSlice",
  reducers: {
    setUserSlice: (state, action) => {
      return { ...action.payload.userInfo };
    },

    signOut: (state, action) => {
      return { ...initialState };
    },
    addItem: (state, action) => { },
    getError: (state, action) => {
      switch (action.payload.errorCode) {
        case "internal-error":
          return {
            userId: null,
            errorMessage: "oops something went Wrong",
          };

        case "user-not-found":
          return {
            userId: null,

            errorMessage: "user not found",
          };
        case "invalid-email":
          return {
            userId: null,
            errorMessage: "invalid email address",
          };
        case "wrong-password":
          return {
            userId: null,
            errorMessage: "wrong password",
          };
        case "network-request-failed":
          return {
            userId: null,
            errorMessage:
              "opps something went wrong ,please check your internet connection",
          };
        case "email-already-in-use":
          return {
            userId: null,
            errorMessage: "email address already in use",
          };
        case "clear-error":
          return initialState;
        default:
          return {
            userId: null,
            errorMessage: "couldn't find this email address",
          };
      }

    },
  },

  initialState,
});

export default userDataSlice.reducer;
export const { signOut, setUserSlice, addItem, getError, addItemToFavourites } =
  userDataSlice.actions;
