import { configureStore } from '@reduxjs/toolkit';
import { productsSlice } from './productsSlice';
import { featuredProductsSlice } from './featuredProductsSlice';
import { SelectedCategorySlice } from './SelectedCategorySlice';
import { popupSlice } from './popupSlice';
import userDataSlice from './userDataSlice';
import cartSlice from './cartSlice';
import storage from 'reduxjs-toolkit-persist/lib/storage';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistCombineReducers,
} from 'reduxjs-toolkit-persist';
import autoMergeLevel2 from 'reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel2';

import { firebaseData } from './FetchApiSlice';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: [
    // "[firebaseData.reducerPath]",
    // "[userData.reducerPath]",
    'products',
    'featuredProducts',
    'EcommerceProducts',
  ],
};
export interface RootState {
  user: ReturnType<typeof userDataSlice>;
  cartState: ReturnType<typeof cartSlice>;
  products: ReturnType<typeof productsSlice.reducer>;
  featuredProducts: ReturnType<typeof featuredProductsSlice.reducer>;
  selectedProducts: ReturnType<typeof SelectedCategorySlice.reducer>;
  popupToggle: ReturnType<typeof popupSlice.reducer>;
}

export const persistedReducers = persistCombineReducers(persistConfig, {
  user: userDataSlice,
  cartState: cartSlice,
  // [firebaseData.reducerPath]: firebaseData.reducer,
  // [userData.reducerPath]: userData.reducer,
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
    }),
  // .concat(firebaseData.middleware),
})

export const reduxPersistor = persistStore(store);