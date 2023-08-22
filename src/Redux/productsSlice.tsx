import { createSlice } from "@reduxjs/toolkit";

const initialState = {

   products: []

}

export const productsSlice = createSlice({
   name: "productsSlice",
   initialState,
   reducers: {

      getData: (state, action) => {

         const { data } = action.payload

         state.products = data
      }
   }
})

export const { getData } = productsSlice.actions;

export default productsSlice.reducer;