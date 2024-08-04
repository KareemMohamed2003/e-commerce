import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./productsSlice";
import { featuredProductsSlice } from "./featuredProductsSlice";
import { firebaseData } from "./FetchApiSlice";
import { SelectedCategorySlice } from "./SelectedCategorySlice";
import { popupSlice } from "./popupSlice";
import userDataSlice from "./userDataSlice";
import { userData } from "./fetchUserData";
import cartSlice from "./cartSlice";
import storage from "reduxjs-toolkit-persist/lib/storage";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistCombineReducers,
} from "reduxjs-toolkit-persist";
import autoMergeLevel1 from "reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1";
import autoMergeLevel2 from "reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel2";

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: [
    "[firebaseData.reducerPath]",
    "[userData.reducerPath]",
    "products",
    "featuredProducts",
    "selectedProducts",
    "EcommerceProducts",
  ],
};

const persistedReducers = persistCombineReducers(persistConfig, {
  user: userDataSlice,
  cartState: cartSlice,
  [firebaseData.reducerPath]: firebaseData.reducer,
  [userData.reducerPath]: userData.reducer,
  products: productsSlice.reducer,
  featuredProducts: featuredProductsSlice.reducer,
  selectedProducts: SelectedCategorySlice.reducer,
  popupToggle: popupSlice.reducer,
});

export const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(firebaseData.middleware),
});
export const reduxPersistor = persistStore(store);
