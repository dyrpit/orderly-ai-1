import { Link as RouterLink } from 'react-router-dom';
import { Flex, Text, Center } from '@chakra-ui/react';
import { type TCategory } from '../../types/category';

export const CategoryItem = ({ category }: { category: TCategory }) => {
  return (
    <Flex
      as={RouterLink}
      to={`/${category.href}`}
      maxW={{ base: '100%', md: '385px' }}
      minW='100%'
      h='203px'
      rounded='xl'
      align='center'
      justify='center'
      bgColor={`${category.backgroundColor}`}
      transition='all 0.2s ease-in-out'
      _hover={{ opacity: 0.8 }}
    >
      <Center p={6}>
        <Text
          fontSize={{ base: 28, md: 34 }}
          color='text.dark'
          fontWeight='bold'
          textAlign='center'
        >
          {category.categoryName.toUpperCase()}
        </Text>
      </Center>
    </Flex>
  );
};
