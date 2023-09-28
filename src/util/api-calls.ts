import { TUser } from '@/types/user.ts';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
// const GPT_API_KEY = import.meta.env.CHAT_GPT_API;
const GPT_API_KEY = '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';
const GPT_URL = 'https://api.openai.com/v1/chat/completions';

export const signUp = (user: TUser) => {
  return axios.post(API_URL + 'users', user);
};

export const signIn = (username: string, password: string) => {
  return axios.get(API_URL + 'users', {
    params: {
      username,
      password
    }
  });
};

export const getAllUsers = () => {
  return axios.get(API_URL + 'users');
};

export const updateUser = (userId: number, newRole: string) => {
  return axios.patch(API_URL + 'users/' + userId, {
    role: newRole
  });
};

export const removeUser = (userId: number) => {
  return axios.delete(API_URL + 'users/' + userId, {});
};

export const callGPT = (prompt: string) => {
  return axios.post(GPT_URL, {
    'model': 'gpt-4',
    'messages': [
      {
        'role': 'user',
        'content': prompt
      }
    ]
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GPT_API_KEY}`
    },
  });
};