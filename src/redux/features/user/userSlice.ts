import { createSlice } from '@reduxjs/toolkit';

type TInitialState = {
  isUserLoggedIn: boolean;
  userLogin: string;
  timer: number;
};

const initialState: TInitialState = {
  isUserLoggedIn: false,
  userLogin: '',
  timer: 300,
};

export const userSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    setLoggedUser: (state) => {
      state.isUserLoggedIn = true;
    },
    setUnLoggedUser: (state) => {
      state.isUserLoggedIn = false;
    },
    setUserLogin: (state, username) => {
      state.userLogin = username.payload;
    },
    resetUserLogin: (state) => {
      state.userLogin = '';
    },
    decrementTimer: (state) => {
      state.timer -= 1;
    },
    resetTimer: (state) => {
      state.timer = 300;
    },
  },
});

export const { setLoggedUser } = userSlice.actions;
export const { setUnLoggedUser } = userSlice.actions;
export const { setUserLogin } = userSlice.actions;
export const { resetUserLogin } = userSlice.actions;
export const { decrementTimer } = userSlice.actions;
export const { resetTimer } = userSlice.actions;

export default userSlice.reducer;
