import { useParams, Link as RouterLink } from 'react-router-dom';
import { useAppSelector } from '@/redux/hooks';
import { Flex, SimpleGrid, Text } from '@chakra-ui/react';

export const ProductsList = () => {
  const { categoryName } = useParams();
  const products = useAppSelector((state) => state.products);

  const details = products.filter(
    (p) => p.category === categoryName?.replace('-', ' '),
  );

  return (
    <SimpleGrid columns={1} w='100%' h='100%' gap='22px' placeItems='center'>
      {details?.map((product) => (
        <Flex
          as={RouterLink}
          to={`${product.name}`}
          key={product.id}
          bg='bg.secondary'
          w='100%'
          h={{ base: '160px', md: '206px' }}
          rounded={18}
          align='center'
          justify='center'
          transition='all 0.2s ease-in-out'
          _hover={{ opacity: 0.6 }}
        >
          <Text color='text.secondary' fontSize={{ base: 28, md: 48 }}>
            {product.name}
          </Text>
        </Flex>
      ))}
    </SimpleGrid>
  );
};
