import { Box, Flex, Heading} from '@chakra-ui/layout';
import { ProductDetailList } from './ProductDetailList';
import { ProductDetailInput } from './ProductDetailInput';
import ProductDetailRadio from './ProductDetailRadio';
import { SaveProductButton } from './SaveProductButton';

export const NewProduct = () => {
  return (
    <Flex
      flexDirection='column'
      bg='bg.secondary'
      minH='300px'
      borderRadius='xl'
      direction={{ base: 'column', md: 'row' }}
      overflow='hidden'
      p={{ base: 0, md: 4 }}
    >
      <Box>
        <Heading
          color='text.secondary'
          fontSize='28px'
          textAlign='center'
          justifyContent='center'
          fontWeight='500'
          p={3}
        >
          Add new category
        </Heading>
      </Box>
      <Flex direction={{ base: 'column', md: 'row' }}>
        <Box flex='1' display='flex' flexDirection='column' >
          <ProductDetailList />
          <ProductDetailInput
            label='Product name'
            placeholder='Insert product name'
            h=''
          />
          <ProductDetailInput label='Website' placeholder='Insert URL' h='' />
          <ProductDetailInput label='Video' placeholder='Insert URL' h=''/>
          <Heading
            color='text.secondary'
            fontSize='28px'
            fontWeight='500'
            p={3}
          >
            Select price
          </Heading>
          <ProductDetailRadio />
        </Box>
        <Box
          flex='1'
          display='flex'
          flexDirection='column'
          alignItems='left'
          justifyContent='space-between'
        >
          <ProductDetailInput
            label='Product description'
            placeholder='Insert description'
            h='150px'
          />
          <SaveProductButton />
        </Box>
      </Flex>
    </Flex>
  );
};
