
import { configureStore } from "@reduxjs/toolkit";

import { productsSlice } from "./productsSlice";
import { featuredProductsSlice } from "./featuredProductsSlice";
import {  firebaseData } from "./FetchApiSlice";
import {SelectedCategorySlice} from "./SelectedCategorySlice";
import { popupSlice } from "./popupSlice";
import userDataSlice from "./userDataSlice";
import { userData } from "./fetchUserData";
import { cartSlice } from "./CartSlice";
// import {sanit}
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}

export const store:any = configureStore({
  
   reducer: {
      // users:usersReducer
      user:userDataSlice, // we are accessing  the reducer by default
      [firebaseData.reducerPath]: firebaseData.reducer,
      [userData.reducerPath]:userData.reducer,
      products: productsSlice.reducer,
      featuredProducts: featuredProductsSlice.reducer,
      selectedProducts:SelectedCategorySlice.reducer,
      popupToggle:popupSlice.reducer,
      cartState:cartSlice.reducer
   }
   ,

   middleware: getDefaultMiddleware => getDefaultMiddleware().concat(firebaseData.middleware)

}


)


//  we are gonna have a state for the user , a a state for the Database Items