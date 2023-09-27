import { useAppDispatch } from '@/redux/hooks';
import { editCategoryName } from '@/redux/features/categories/categoriesSlice';
import { editCategoryForAllProducts } from '@/redux/features/products/productsSlice';

export const useEditCategoryName = () => {
  const dispatch = useAppDispatch();

  return ({
    categoryName,
    newCategoryName,
  }: {
    categoryName: string;
    newCategoryName: string;
  }) => {
    dispatch(editCategoryName({ categoryName, newCategoryName }));

    dispatch(
      editCategoryForAllProducts({
        categoryName: categoryName,
        newCategoryName: newCategoryName,
      }),
    );
  };
};
