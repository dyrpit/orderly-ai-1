import { Box, Heading } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/react';
import { useAppSelector } from '@/redux/hooks';

export const ProductDetailList = () => {
  const categories = useAppSelector((state) => state.categories);

  return (
    <Box marginRight='10'>
      <Heading color='text.secondary' fontSize='28px' fontWeight='500' p={3}>
        Category
      </Heading>
      <Select
        placeholder='Select category'
        w='100%'
        h='46px'
        bg='#1E345B'
        border='none'
        fontSize='20px'
        color='#FFFFFF40'
        paddingLeft={3}
      >
        {categories.map((category) => (
          <option key={category.id}>{category.categoryName}</option>
        ))}
      </Select>
    </Box>
  );
};
