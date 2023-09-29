import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

type TInitialState = {
  isWaitingForResponse: boolean;
  isSwitchActive: boolean;
};

const initialState: TInitialState = {
  isWaitingForResponse: false,
  isSwitchActive: false,
};

export const gptSlice = createSlice({
  name: 'gpt',
  initialState,
  reducers: {
    setIsWaitingForResponse: (state) => {
      state.isWaitingForResponse = true;
    },
    setIsNotWaitingForResponse: (state) => {
      state.isWaitingForResponse = false;
    },
    toggleSwitch: (state) => {
      state.isSwitchActive = !state.isSwitchActive;
    },
  },
});

export const {
  setIsWaitingForResponse,
  setIsNotWaitingForResponse,
  toggleSwitch,
} = gptSlice.actions;

export const selectCount = (state: RootState) => state.gpt;

export default gptSlice.reducer;
