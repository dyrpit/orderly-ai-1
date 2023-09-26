import { createSlice } from '@reduxjs/toolkit';

type TInitialState = {
  isUserLoggedIn: boolean;
};

const initialState: TInitialState = {
  isUserLoggedIn: false,
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
    }
  }
});

export const {setLoggedUser} = userSlice.actions;
export const {setUnLoggedUser} = userSlice.actions;

export default userSlice.reducer;
