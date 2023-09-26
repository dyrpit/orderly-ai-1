import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import categoriesReducer from './features/categories/categoriesSlice';
import productsReducer from './features/products/productsSlice';
import adminPanelReducer from './features/adminPanel/adminPanelSlice';
import userReducer from './features/user/userSlice.ts';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  categories: categoriesReducer,
  products: productsReducer,
  adminPanel: adminPanelReducer,
  user: userReducer,
});

const persistedReducers = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducers,
  devTools: true,
  middleware: [thunk],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
