import { createSlice } from '@reduxjs/toolkit';

type TInitialState = {
  isWaitingForResponse: boolean;

};
const initialState: TInitialState = {
  isWaitingForResponse: false
};
export const isWaitingForResponseSlice = createSlice({
  name: 'isWaitingForResponseState',
  initialState,
  reducers: {
    setIsWaitingForResponse: (state) => {
      state.isWaitingForResponse = true;
    },
    setIsNotWaitingForResponse: (state) => {
      state.isWaitingForResponse = false;
    }
  }
});

export const { setIsWaitingForResponse } = isWaitingForResponseSlice.actions;
export const { setIsNotWaitingForResponse } = isWaitingForResponseSlice.actions;

export default isWaitingForResponseSlice.reducer;