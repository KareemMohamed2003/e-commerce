import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./productsSlice";
import { featuredProductsSlice } from "./featuredProductsSlice";
import { firebaseData } from "./FetchApiSlice";
import { SelectedCategorySlice } from "./SelectedCategorySlice";
import { popupSlice } from "./popupSlice";
import userDataSlice from "./userDataSlice";
import { userData } from "./fetchUserData";
import cartSlice from "./cartSlice";
import storage from 'reduxjs-toolkit-persist/lib/storage'
import {
  persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE
  , PERSIST, PURGE, REGISTER, persistCombineReducers
} from 'reduxjs-toolkit-persist';
import autoMergeLevel1 from 'reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1';
import autoMergeLevel2 from 'reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel2';
// import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['[firebaseData.reducerPath]', '[userData.reducerPath]', 'products', 'featuredProducts', 'selectedProducts', 'EcommerceProducts']

}
const reducers = combineReducers({ ...userDataSlice, ...cartSlice })
console.log("combined reducers", reducers)
// remeber that the data maybe exceed the browser limit since we have images 
console.log(userDataSlice, cartSlice)
// const persistedReducer = persistCombineReducers(persistConfig, { user: userDataSlice, cartState: cartSlice })
const _persistedUserReducer = persistReducer(persistConfig, userDataSlice)
const _persistedCartReducer = persistReducer(persistConfig, cartSlice)
const persistedReducers = persistCombineReducers(persistConfig, {
  user: userDataSlice, cartState: cartSlice,
  [firebaseData.reducerPath]: firebaseData.reducer,
  [userData.reducerPath]: userData.reducer,
  products: productsSlice.reducer,
  featuredProducts: featuredProductsSlice.reducer,
  selectedProducts: SelectedCategorySlice.reducer,
  popupToggle: popupSlice.reducer,


})
console.log(_persistedUserReducer)
console.log(persistedReducers)
export const store = configureStore({
  reducer: persistedReducers
  ,


  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER]
      }
    }).concat(firebaseData.middleware),

});
export const reduxPersistor = persistStore(store)
//  we are gonna have a state for the user , a a state for the Database Items
