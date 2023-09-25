import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import categoriesReducer from './features/categories/categoriesSlice';
import productsReducer from './features/products/productsSlice';
import adminPanelReducer from './features/adminPanel/adminPanelSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, adminPanelReducer);

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    // users: usersReducer,
    adminPanel: persistedReducer,
  },
  devTools: true,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
