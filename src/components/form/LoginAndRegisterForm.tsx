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
import { formStyles } from './LoginAndResgisterFormStyles';

export const Form = () => {
  const [activeButton, setActiveButton] = useState<'login' | 'signup'>('login');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleButtonToggle = (buttonName: 'login' | 'signup') => {
    setActiveButton(buttonName);
    if (buttonName === 'signup') {
      setShowConfirmPassword(true);
    } else {
      setShowConfirmPassword(false);
    }
  };

  const handleChange = (e:KeyboardEvent) =>{

  }

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

        <form method="POST">
          <FormControl>
            <FormLabel style={formStyles.formLabel}>Username</FormLabel>
            <Input
              style={formStyles.formInput}
              type='text'
              placeholder='Insert your username'
            />
          </FormControl>

          <FormControl>
            <FormLabel style={formStyles.formLabel}>Password</FormLabel>
            <Input
              style={formStyles.formInput}
              type='password'
              placeholder='Insert your password'
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
              sx={{
                '&:hover': {
                  backgroundColor: '#64FFDA',
                },
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
