import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {

   userId: null,
   cartItems: [],
   favouriteItems: [],
   errorMessage: false

};

export const userDataSlice: any = createSlice({
   name: "userDataSlice",
   reducers: {
      getUserData: (state, action) => {
         return { ...action.payload.userInfo }
      }

      , signOut: (state, action) => {
         return initialState
      },
        addItem: (state, action) => { }
      , getError: (state, action) => {

         switch (action.payload.errorCode) {
            case "internal-error":
               return {
                  userId: null,
                  cartItems: null,
                  favouriteItems: null,
                  errorMessage: "oops something went Wrong"
               }

            case "user-not-found":
               return {
                  userId: null,
                  cartItems: null,
                  favouriteItems: null,
                  errorMessage: "user not found"
               }
            case "invalid-email":
               return {
                  userId: null,
                  cartItems: null,
                  favouriteItems: null,
                  errorMessage: "invalid email address"
               }
            case "wrong-password":
               return {
                  userId: null,
                  cartItems: null,
                  favouriteItems: null,
                  errorMessage: "wrong password"
               }
            case "network-request-failed":
               return {
                  userId: null,
                  cartItems: null,
                  favouriteItems: null,
                  errorMessage: "opps something went wrong ,please check your internet connection"
               }
            case "email-already-in-use":
               return {
                  userId: null,
                  cartItems: null,
                  favouriteItems: null,
                  errorMessage: "email address already in use"
               }
            case "clear-error":
               return initialState
         }
      }
   },

   initialState
})

export default userDataSlice.reducer;
export const { signOut, getUserData, addItem, getError, addItemToFavourites } = userDataSlice.actions