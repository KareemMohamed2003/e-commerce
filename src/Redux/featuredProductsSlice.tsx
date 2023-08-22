import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   featuredProducts: {}
}
export const featuredProductsSlice = createSlice({
   name: "featuredProductsSlice",
   initialState,
   reducers: {
      displayFeaturedProducts: (state, action) => {
         const { data } = action.payload

         const arr = []
         arr.push(data)
         state.featuredProducts = data;

      }
   }
})
export const { displayFeaturedProducts } = featuredProductsSlice.actions
export default featuredProductsSlice.reducer