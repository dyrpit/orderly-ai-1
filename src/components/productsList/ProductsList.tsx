import { Flex, Link, SimpleGrid, Text } from '@chakra-ui/react';

import { fakeCategoriesAndProducts } from '../../data/fakeCategoriesAndProducts';

// Here we will set category name and product name from useParams
const categoryName = 'productivity';

const details = fakeCategoriesAndProducts.find((p) => p.href === categoryName)
  ?.products;

export const ProductsList = () => {
  return (
    <SimpleGrid columns={1} w='100%' h='100%' gap='22px' placeItems='center'>
      {details?.map((product) => (
        <Flex
          as={Link}
          key={product.id}
          bg='bg.secondary'
          w='100%'
          h={{ base: '160px', md: '206px' }}
          rounded={18}
          align='center'
          justify='center'
          href={`${product.category}/${product.name}`}
          _hover={{ textDecoration: 'none' }}
        >
          <Text color='text.secondary' fontSize={{ base: 28, md: 48 }}>
            {product.name}
          </Text>
        </Flex>
      ))}
    </SimpleGrid>
  );
};
