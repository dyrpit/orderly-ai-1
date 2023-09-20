import { SimpleGrid } from '@chakra-ui/react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import {
  addCategory,
  deleteCategory,
} from '../../redux/features/categories/categoriesSlice';
import { CategoryItem } from './CategoryItem';

export const CategoriesList = () => {
  const categories = useAppSelector((state) => state.categories);
  const dispatch = useAppDispatch();

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} justifyItems='center'>
      <button
        onClick={() => {
          dispatch(
            deleteCategory({
              id: 7,
            }),
          );
        }}
      >
        Delete this category of id 7
      </button>
      <button
        onClick={() => {
          dispatch(
            addCategory({
              id: 7,
              categoryName: 'productivity',
              backgroundColor: 'rgba(247,217,196,0.6)',
              href: 'oomm',
            }),
          );
        }}
      >
        Add new category
      </button>
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </SimpleGrid>
  );
};
