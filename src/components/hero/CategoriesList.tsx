import { SimpleGrid } from '@chakra-ui/react';
import { useAppSelector } from '../../redux/hooks';
import { CategoryItem } from './CategoryItem';

export const CategoriesList = () => {
  const categories = useAppSelector((state) => state.categories);

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} justifyItems='center'>
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </SimpleGrid>
  );
};
