import { createSlice } from '@reduxjs/toolkit';

type TInitialState = {
  isUserLoggedIn: boolean,
  userLogin: string
};

const initialState: TInitialState = {
  isUserLoggedIn: false,
  userLogin: ''
};

export const userSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    setLoggedUser: (state) =>{
      state.isUserLoggedIn = true;
    },
    setUnLoggedUser: (state) => {
      state.isUserLoggedIn = false;
    },
    setUserLogin: (state, username) => {
      state.userLogin = username.payload
    },
    resetUserLogin: (state) => {
      state.userLogin = ''
    }
  }
});

export const {setLoggedUser} = userSlice.actions;
export const {setUnLoggedUser} = userSlice.actions;
export const {setUserLogin} = userSlice.actions;
export const {resetUserLogin} = userSlice.actions;

export default userSlice.reducer;
