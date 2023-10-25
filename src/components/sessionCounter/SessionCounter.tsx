import { Box } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  decrementTimer,
  resetTimer,
  setUnLoggedUser,
} from '@/redux/features/user/userSlice.ts';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { setOffAdminPanel } from '@/redux/features/adminPanel/adminPanelSlice';
import toast from 'react-hot-toast';

export const SessionCounter = () => {
  const inactivityTimer = useAppSelector((state) => state.user.timer);
  const dispatch = useAppDispatch();
  const isUserLogin = useAppSelector((state) => state.user.isUserLoggedIn);
  const navigate = useNavigate();

  const storeState = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(resetTimer());
  }, [storeState]);

  useEffect(() => {
    if (isUserLogin) {
      const interval = setInterval(() => {
        if (inactivityTimer > 0) {
          dispatch(decrementTimer());
        } else {
          dispatch(setUnLoggedUser());
          navigate('/');
          sessionStorage.removeItem('token');
          dispatch(setOffAdminPanel());
          dispatch(resetTimer());
          toast('Session has expired!', { icon: '⏳' });
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [dispatch, inactivityTimer, isUserLogin]);

  if (isUserLogin && inactivityTimer < 10) {
    return (
      <Box
        position={{ base: 'fixed', md: 'absolute' }}
        top={{ base: 'auto', md: 0 }}
        bottom={{ base: 0, md: 'auto' }}
        right={{ base: '25%', md: 5 }}
        left={{ base: '25%', md: 'auto' }}
        padding='5'
        maxWidth={200}
        backgroundColor='bg.counter'
        color='text.secondary'
        borderBottomRadius={{ base: 0, md: 10 }}
        borderTopRadius={{ base: 10, md: 0 }}
        textAlign='center'
        zIndex={1}
      >
        Logout in {inactivityTimer} seconds
      </Box>
    );
  } else return null;
};
