import { createSlice } from '@reduxjs/toolkit';

const initialState: { products: null | [] } = {
  products: null,
};

export const productsSlice = createSlice({
  name: 'productsSlice',
  initialState,
  reducers: {
    getData: (state, action) => {
      const { products } = action.payload;
      state.products = products;
    },
    resetProducts: () => initialState,
  },
});

export const { getData, resetProducts } = productsSlice.actions;

export default productsSlice.reducer;
