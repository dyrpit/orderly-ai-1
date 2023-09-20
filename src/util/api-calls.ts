import { TUser } from '@/types/user.ts';
import { API_URL } from './constants.ts';
import axios from 'axios';

export const signUp = (user: TUser) =>{
  return axios.post(API_URL + "users", user);
}

export const signIn = (username: string, password: string) =>{
  return axios.get(API_URL + "users", {
    params: {
      username,
      password
    }
  });
}


