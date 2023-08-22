import { createSlice } from "@reduxjs/toolkit";

const initialState: string | any = { productsToDisplay: null }

const filterCategories = (state: any, category: string) => {
   const filteredItems = state.products.products.filter((el: any) => category.includes("/") ? el.subCategory === category : el.category === category)

   return filteredItems;
}
export const SelectedCategorySlice = createSlice({
   name: "SelectedCategorySlice",
   initialState,
   reducers: {

      displayProducts(state, action) {
       

         switch (action.payload.type) {
            case "cameras":

               state.productsToDisplay = filterCategories(action.payload.state, "electronics/cameras");
               break;
            case "security&surveillance":

               state.productsToDisplay = filterCategories(action.payload.state, "electronics/security&surveillance")

               break;
            case "vehicle electronics":
               state.productsToDisplay = filterCategories(action.payload.state, "electronics/vehicleElectronics");
               break;
            case "headphones":
               state.productsToDisplay = filterCategories(action.payload.state, "electronics/headphones");

               break;
            case "women's clothing":
               state.productsToDisplay = filterCategories(action.payload.state, "womenFashion/clothing");

               break;
            case "women's accessories":
               state.productsToDisplay = filterCategories(action.payload.state, "womenFashion/accessories");

               break;
            case "women's handbags":
               state.productsToDisplay = filterCategories(action.payload.state, "womenFashion/handbags");

               break;
            case "women's shoes":

               state.productsToDisplay = filterCategories(action.payload.state, "womenFashion/shoes");

               break;
            case "books":
               state.productsToDisplay = filterCategories(action.payload.state, "books");

               break;
            case "data storage":
               state.productsToDisplay = filterCategories(action.payload.state, "dataStorage");
               break;
            case "computer perpherials":
               state.productsToDisplay = filterCategories(action.payload.state, "computerPerpherials");

               break;
            case "men's shoes":
               state.productsToDisplay = filterCategories(action.payload.state, "menFashion/shoes");

               break;
            case "men's watches":
               state.productsToDisplay = filterCategories(action.payload.state, "menFashion/watches");

               break;
            case "men's clothing":
               state.productsToDisplay = filterCategories(action.payload.state, "menFashion/clothing");

               break;
            case "men's accessories":
               state.productsToDisplay = filterCategories(action.payload.state, "menFashion/accessories");

               break;

            default:
               break;
         }
      }
   }
})

export const { displayProducts } = SelectedCategorySlice.actions;
export default SelectedCategorySlice.reducer