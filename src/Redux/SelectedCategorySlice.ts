import { createSlice } from '@reduxjs/toolkit';
import { filterCategories } from '../lib/helpers';
import { SelectedCategory, selectedCategoryType } from '../types';

const initialState: SelectedCategory = {
  productsToDisplay: null,
  selectedCategory: '',
};



interface selectedCategoryAction {
  payload: { type: selectedCategoryType; state: unknown };
}

export const SelectedCategorySlice = createSlice({
  name: 'SelectedCategorySlice',
  initialState,
  reducers: {
    displayProducts(state: SelectedCategory, action: selectedCategoryAction) {
      switch (action.payload.type) {
        case 'cameras':
          state.productsToDisplay = filterCategories(
            action.payload.state,
            'electronics-cameras'
          );
          state.selectedCategory = 'cameras';
          break;
        case 'security&surveillance':
          state.productsToDisplay = filterCategories(
            action.payload.state,
            'electronics-security_surveillance'
          );
          state.selectedCategory = 'security&surveillance';
          break;
        case 'vehicle electronics':
          state.productsToDisplay = filterCategories(
            action.payload.state,
            'electronics-vehicleElectronics'
          );
          state.selectedCategory = 'vehicle Electronics';

          break;
        case 'headphones':
          state.productsToDisplay = filterCategories(
            action.payload.state,
            'electronics-headphones'
          );
          state.selectedCategory = 'headphones';
          break;
        case "women's clothing":
          state.productsToDisplay = filterCategories(
            action.payload.state,
            'womenFashion-clothing'
          );
          state.selectedCategory = 'women  clothing';
          break;
        case "women's accessories":
          state.productsToDisplay = filterCategories(
            action.payload.state,
            'womenFashion-accessories'
          );
          state.selectedCategory = 'women  accessories';
          break;
        case "women's handbags":
          state.productsToDisplay = filterCategories(
            action.payload.state,
            'womenFashion-handbags'
          );
          state.selectedCategory = 'women  handbags';
          break;
        case "women's shoes":
          state.productsToDisplay = filterCategories(
            action.payload.state,
            'womenFashion-shoes'
          );
          state.selectedCategory = 'women  shoes';
          break;
        case 'books':
          state.productsToDisplay = filterCategories(
            action.payload.state,
            'books'
          );
          state.selectedCategory = 'books';
          break;
        case 'data storage':
          state.productsToDisplay = filterCategories(
            action.payload.state,
            'dataStorage'
          );
          state.selectedCategory = 'data storage';
          break;
        case 'computer perpherials':
          state.productsToDisplay = filterCategories(
            action.payload.state,
            'computerPerpherials'
          );
          state.selectedCategory = 'computer Perpherials';
          break;
        case "men's shoes":
          state.productsToDisplay = filterCategories(
            action.payload.state,
            'menFashion-shoes'
          );
          state.selectedCategory = 'men shoes';

          break;
        case "men's watches":
          state.productsToDisplay = filterCategories(
            action.payload.state,
            'menFashion-watches'
          );
          state.selectedCategory = 'men watches';
          break;
        case "men's clothing":
          state.productsToDisplay = filterCategories(
            action.payload.state,
            'menFashion-clothing'
          );
          state.selectedCategory = 'men clothing';

          break;
        case "men's accessories":
          state.productsToDisplay = filterCategories(
            action.payload.state,
            'menFashion-accessories'
          );
          state.selectedCategory = 'men accessories';

          break;
        case 'video games':
          state.productsToDisplay = filterCategories(
            action.payload.state,
            'videoGames'
          );
          state.selectedCategory = 'video games';
          break;
        default:
          break;
      }
    },
    resetSelectedProducts() {
      return initialState;
    },
  },
});

export const { displayProducts, resetSelectedProducts } =
  SelectedCategorySlice.actions;
export default SelectedCategorySlice.reducer;
