import { Box } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { decrementTimer, resetTimer } from '@/redux/features/user/userSlice.ts';
import { useEffect } from 'react';


export const SessionCounter = () => {

    

const inactivityTimer = useAppSelector((state) => state.user.timer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setInterval(() => {
      if (inactivityTimer > 0) {
        dispatch(decrementTimer());
      } else {

        // dispatch(logout());
        console.log('wylogowano')
      }
    }, 1000);


    dispatch(resetTimer());

    return () => clearInterval(timer);
  }, [dispatch, inactivityTimer]);

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
};
