import { TUser } from '../types/user.ts';
import { API_URL } from './constants.ts';
import axios from 'axios';

export const signUp = (user: TUser) =>{
  return axios.post(API_URL + "users", user);
}

export const signIn = (username: string, password: string) =>{
  return axios.get(API_URL, {
    params: {
      username,
      password
    }
  });
}

// signIn('test', '123').then((res)=>console.log(res.data));

//const user:TUser = {
//     username: "TESTOWY",
//     password: "456",
//     role: "admin"
//   }
//
//   signUp(user).then((res)=>console.log(res));


