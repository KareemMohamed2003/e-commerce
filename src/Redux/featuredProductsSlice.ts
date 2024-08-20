import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  featuredProducts: {},
};
export const featuredProductsSlice = createSlice({
  name: "featuredProductsSlice",
  initialState,
  reducers: {
    displayFeaturedProducts: (state, action) => {
      const { products } = action.payload;
      const arr = [];
      arr.push(products);
      state.featuredProducts = products;
    },
    resetFeaturedProducts: () => {
      return {
        featuredProducts: {},
      };
    },
  },
});
export const { displayFeaturedProducts, resetFeaturedProducts } =
  featuredProductsSlice.actions;
export default featuredProductsSlice.reducer;
