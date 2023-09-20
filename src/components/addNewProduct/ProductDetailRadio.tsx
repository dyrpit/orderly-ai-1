import { Heading, Stack } from '@chakra-ui/layout';
import { Box, Radio, RadioGroup } from '@chakra-ui/react';
import React from 'react';

const ProductDetailRadio = () => {
  const [value, setValue] = React.useState('1');

  return (
    <RadioGroup onChange={setValue} value={value}>
      <Stack direction='row'>
        <CustomRadio value='1'>Free</CustomRadio>
        <CustomRadio value='2'>Paid</CustomRadio>
      </Stack>
    </RadioGroup>
  );
};

const CustomRadio = ({ children, ...props }: { children: React.ReactNode }) => {
  return (
    <Box
      width='100px'
      height='35px'
      backgroundColor='#1E345B'
      m='0 10px'
      color='white'
      borderRadius='4px'
      display='flex'
      alignItems='center'
      justifyContent='center'
      cursor='pointer'
      _hover={{
        backgroundColor: '#2E4C7B', // Kolor w stanie hover
      }}
      _checked={{
        backgroundColor: '#2E4C7B', // Kolor w zaznaczonym stanie
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default ProductDetailRadio;
