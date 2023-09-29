import Spinner from '@assets/loading-spinner.svg';
import { Flex, Image, Text, keyframes } from '@chakra-ui/react';

const spinAnimation = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
});
export const LoadingSpinner = () => {
  return (
    <Flex
      justifyContent='center'
      alignItems='center'
      overflow='hidden'
      direction='column'
      gap={12}
    >
      <Image
        src={Spinner}
        sx={{ animation: `${spinAnimation} 2s ease infinite` }}
      />
      <Text fontSize={36} textAlign='center'>
        Waiting for API Response
      </Text>
    </Flex>
  );
};
