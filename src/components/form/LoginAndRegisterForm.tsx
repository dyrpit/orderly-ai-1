import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import Joi, { ValidationResult } from 'joi';

import { formStyles } from './LoginAndResgisterFormStyles';
import { signIn, signUp } from '../../util/api-calls.ts';
import { TUser } from '../../types/user.ts';

export interface FormData {
  username: string;
  password: string;
  confirmPassword?: string;
}

export const Form = () => {
  const [activeButton, setActiveButton] = useState<'login' | 'signup'>('login');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleButtonToggle = (buttonName: 'login' | 'signup') => {
    setActiveButton(buttonName);
    if (buttonName === 'signup') {
      setShowConfirmPassword(true);
    } else {
      setShowConfirmPassword(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateFormData = (data: FormData): ValidationResult => {
    const validationSchema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
      confirmPassword:
        activeButton === 'signup'
          ? Joi.valid(Joi.ref('password')).required()
          : Joi.optional(),
    });

    return validationSchema.validate(data);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const validationResult = validateFormData(formData);

    if (validationResult.error) {
      setValidationError(validationResult.error.details[0].message);
      setFormSubmitted(false);
    } else {
      setValidationError(null);
      setFormSubmitted(true);

      console.log('Dane są poprawne:', formData);
      let isLogin: boolean = false;
      activeButton === 'login' ? isLogin = true : isLogin = false;
      sendData(isLogin, formData.username, formData.password);
    }
  };

  const sendData = async (isLogin: boolean, username: string, password: string) => {
    if (isLogin) {
      sessionStorage.removeItem('isLogged');
      await signIn(username, password).then((res) => {
        if (res.data.length > 0) {
          sessionStorage.setItem('isLogged', 'true');
          console.log('OK');
          //navigate?
        } else {
          console.log('User does not exist!');
          //show error?
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
              name='username'
              value={formData.username}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel style={formStyles.formLabel}>Password</FormLabel>
            <Input
              style={formStyles.formInput}
              type='password'
              placeholder='Insert your password'
              name='password'
              value={formData.password}
              onChange={handleInputChange}
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
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </FormControl>
          )}

          <Flex justifyContent='center'>
            <Button colorScheme='teal' variant='outline' type='submit' onClick={handleSubmit}>
              {activeButton === 'login' ? 'Log In' : 'Send'}
            </Button>
          </Flex>
        </form>

        {validationError && (
          <Box color='red.500' textAlign='center'>
            {validationError}
          </Box>
        )}

        {formSubmitted && !validationError && (
          <Box color='green.500' textAlign='center'>
            Formularz został pomyślnie przesłany!
          </Box>
        )}
      </Stack>
    </Box>
  );
};
