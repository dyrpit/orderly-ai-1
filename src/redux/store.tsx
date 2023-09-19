import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './features/categories/categoriesSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    // products: productsReducer,
    // users: usersReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
