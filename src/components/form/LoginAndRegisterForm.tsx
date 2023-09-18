import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { formStyles } from './LoginAndResgisterFormStyles';
import { signIn, signUp } from '../../util/api-calls.ts';
import { TUser } from '../../types/user.ts';

export const Form = () => {
  const [activeButton, setActiveButton] = useState<'login' | 'signup'>('login');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleButtonToggle = (buttonName: 'login' | 'signup') => {
    setActiveButton(buttonName);
    if (buttonName === 'signup') {
      setShowConfirmPassword(true);
    } else {
      setShowConfirmPassword(false);
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    console.log(username);
    console.log(password);

    /* if fields are not empty etc */

    let isLogin: boolean = false;
    activeButton === 'login' ? isLogin = true : isLogin = false;


    handleLogin(isLogin, username, password);
  };

  const handleLogin = async (isLogin: boolean, username: string, password: string) => {
    if (isLogin) {
      sessionStorage.removeItem('isLogged');
      await signIn(username, password).then((res) => {
        if (res.data.length > 0) {
          sessionStorage.setItem('isLogged', 'true');
          console.log('OK');
          //navigate?
          alert("Jest zajebiście");
        } else {
          console.log('User does not exist!');
          //show error?
          alert("Jest chujowo");
        }
      }).catch((err) => {
        throw new Error(err.message);
        //show error?
      });
    } else {
      const newUser: TUser = {
        username: username,
        password: password,
        role: 'regular'
      };
      await signUp(newUser).then((res) => {
        console.log(res);
        if (res.status === 201) {
          //show message?
          alert("Jest zajebiście");
        }
      }).catch((err) => {
        throw new Error(err.message);
      });
    }
  };

  return (
    <Box maxW='md' mx='auto' p={4}>
      <Stack spacing={4}>
        <Box display='flex' justifyContent='center' gap={5}>
          <Button
            variant='link'
            colorScheme={activeButton === 'login' ? 'teal' : 'gray'}
            onClick={() => handleButtonToggle('login')}
          >
            Log In
          </Button>

          <Button
            variant='link'
            colorScheme={activeButton === 'signup' ? 'teal' : 'gray'}
            onClick={() => handleButtonToggle('signup')}
          >
            Sign Up
          </Button>
        </Box>

        <form>
          <FormControl>
            <FormLabel style={formStyles.formLabel}>Username</FormLabel>
            <Input
              style={formStyles.formInput}
              type='text'
              placeholder='Insert your username'
              value={username}
              onChange={handleUsernameChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel style={formStyles.formLabel}>Password</FormLabel>
            <Input
              style={formStyles.formInput}
              type='password'
              placeholder='Insert your password'
              value={password}
              onChange={handlePasswordChange}
            />
          </FormControl>

          {showConfirmPassword && (
            <FormControl>
              <FormLabel style={formStyles.formLabel}>
                Confirm Password
              </FormLabel>
              <Input
                style={formStyles.formInput}
                type='password'
                placeholder='Confirm your password'
              />
            </FormControl>
          )}
          <Flex justifyContent='center'>
            <Button
              colorScheme='teal'
              variant='outline'
              type='submit'
              onClick={handleSubmit}
              sx={{
                '&:hover': {
                  backgroundColor: '#64FFDA'
                }
              }}
            >
              {activeButton === 'login' ? 'Log In' : 'Send'}
            </Button>
          </Flex>
        </form>
      </Stack>
    </Box>
  );
};
