import Spinner from '@assets/loading-spinner.svg';
import { Image, keyframes } from '@chakra-ui/react';

const spinAnimation = keyframes({ from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } });
export const LoadingSpinner = () => {
  return (
    <Image src={Spinner} sx={{ animation: `${spinAnimation} 2s ease infinite` }}></Image>);
};