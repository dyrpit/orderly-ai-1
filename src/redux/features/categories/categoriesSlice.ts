import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { type TCategory } from '@/types/category';

const initialState: TCategory[] = [
  {
    id: 1,
    categoryName: 'writing',
    backgroundColor: 'rgba(250,237,203,0.6)',
    href: 'writing',
  },
  {
    id: 2,
    categoryName: 'productivity',
    backgroundColor: 'rgba(201,228,222,0.6)',
    href: 'productivity',
  },
  {
    id: 3,
    categoryName: 'video generating',
    backgroundColor: 'rgba(198,222,241,0.6)',
    href: 'video-generating',
  },
  {
    id: 4,
    categoryName: 'image generating',
    backgroundColor: 'rgba(219,205,240,0.6)',
    href: 'image-generating',
  },
  {
    id: 5,
    categoryName: 'chatbots',
    backgroundColor: 'rgba(242,198,222,0.6)',
    href: 'chatbots',
  },
  {
    id: 6,
    categoryName: 'marketing',
    backgroundColor: 'rgba(247,217,196,0.6)',
    href: 'marketing',
  },
];

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    deleteCategory: (
      state,
      action: PayloadAction<Pick<TCategory, 'categoryName'>>,
    ) => {
      return state.filter(
        (category) => category.categoryName !== action.payload.categoryName,
      );
    },
    editCategoryName: (state) => {
      return state;
    },
    addCategory: (state, action: PayloadAction<TCategory>) => {
      state = [action.payload, ...state];
      return state;
    },
    fetchCategories: (_state, action: PayloadAction<TCategory[]>) => {
      return [...action.payload];
    },
  },
});

export const {
  deleteCategory,
  editCategoryName,
  addCategory,
  fetchCategories,
} = categoriesSlice.actions;

export const selectCount = (state: RootState) => state.categories;

export default categoriesSlice.reducer;
