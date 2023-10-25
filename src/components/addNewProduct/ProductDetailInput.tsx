import { Box, Heading } from '@chakra-ui/layout';
import { Input } from '@chakra-ui/input';

export const ProductDetailInput = ({ label, placeholder, h }:{label:string,placeholder:string,h:string}) => {
  return (
    <Box >
      <Heading color='text.secondary' fontSize='28px' fontWeight='500' p={3}>
        {label}
      </Heading>
      <Box paddingLeft={3} marginRight={10}>
        <Input
          placeholder={placeholder}
          w='100%'
          h={h}
          bg='#1E345B'
          border='none'
          fontSize='20px'
          color='#FFFFFF40'
          textAlign='left'
        ></Input>
      </Box>
    </Box>
  );
};
