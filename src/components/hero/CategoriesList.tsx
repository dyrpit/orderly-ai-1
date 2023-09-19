import { SimpleGrid } from '@chakra-ui/react';
import { fakeCategoriesAndProducts } from '../../data/fakeCategoriesAndProducts';
import { CategoryItem } from './CategoryItem';

export const CategoriesList = () => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} justifyItems='center'>
      {fakeCategoriesAndProducts.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </SimpleGrid>
  );
};
