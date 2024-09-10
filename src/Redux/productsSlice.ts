import { createSlice } from '@reduxjs/toolkit';
import { IproductSlice } from '../types';

const initialState: { products: null | IproductSlice } = {
  products: null,
};
export const productsSlice = createSlice({
  name: 'productsSlice',
  initialState,
  reducers: {
    getData: (state, action) => {
      const { products } = action.payload;
      console.log('products', products);
      state.products = products;
    },
    resetProducts: () => initialState,
  },
});

export const { getData, resetProducts } = productsSlice.actions;

export default productsSlice.reducer;
