import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { type TProduct } from '@types/product';

const initialState: TProduct[] = [];

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    deleteProduct: (state) => {
      return state;
    },
    editProduct: (state) => {
      return state;
    },
    addProduct: (state) => {
      return state;
    },
  },
});

export const { deleteProduct, editProduct, addProduct } = productsSlice.actions;

export const selectCount = (state: RootState) => state.products;

export default productsSlice.reducer;
