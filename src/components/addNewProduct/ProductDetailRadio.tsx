import { Stack } from '@chakra-ui/layout';
import { Box } from '@chakra-ui/react';
import React, { useState } from 'react';

interface productDetailRadioProps {
  setPaid: (newValue: string) => void;
}

const ProductDetailRadio = ({ setPaid }:productDetailRadioProps) => {
  const [value, setValue] = useState<string>('');

  const handleRadioChange = (newValue: string) => {
    setValue(newValue);
    setPaid(newValue);
  };

  return (
    <Stack direction='row'>
      <CustomRadio
        value='free'
        onChange={handleRadioChange}
        isChecked={value === 'free'}
      >
        Free
      </CustomRadio>
      <CustomRadio
        value='paid'
        onChange={handleRadioChange}
        isChecked={value === 'paid'}
      >
        Paid
      </CustomRadio>
    </Stack>
  );
};

const CustomRadio = ({
                       children,
                       value,
                       onChange,
                       isChecked
                     }: {
  children: React.ReactNode;
  value: string;
  onChange: (newValue: string) => void;
  isChecked: boolean;
}) => {
  return (
    <Box
      width='100px'
      height='35px'
      backgroundColor={isChecked ? '#2E4C7B' : '#1E345B'}
      m='0 10px'
      color='white'
      borderRadius='4px'
      display='flex'
      alignItems='center'
      justifyContent='center'
      cursor='pointer'
      _hover={{
        backgroundColor: '#2E4C7B'
      }}
      onClick={() => onChange(value)}
    >
      {children}
    </Box>
  );
};

export default ProductDetailRadio;
