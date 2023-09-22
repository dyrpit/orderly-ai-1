import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

type TInitialState = {
  isAdminPanelOpen: boolean;
};

const initialState: TInitialState = {
  isAdminPanelOpen: false,
};

export const adminPanelSlice = createSlice({
  name: 'adminPanel',
  initialState,
  reducers: {
    toggleAdminPanel: (state) => {
      state.isAdminPanelOpen = !state.isAdminPanelOpen;
    },
  },
});

export const { toggleAdminPanel } = adminPanelSlice.actions;

export const selectCount = (state: RootState) => state.adminPanel;

export default adminPanelSlice.reducer;
