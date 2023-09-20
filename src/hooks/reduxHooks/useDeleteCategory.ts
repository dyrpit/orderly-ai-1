import { useAppDispatch } from '@/redux/hooks';
import { deleteCategory } from '@/redux/features/categories/categoriesSlice';
import { deleteAllProducts } from '@/redux/features/products/productsSlice';

export const useDeleteCategory = () => {
  const dispatch = useAppDispatch();

  return ({ categoryName }: { categoryName: string }) => {
    dispatch(
      deleteCategory({
        categoryName,
      }),
    );

    dispatch(
      deleteAllProducts({
        category: categoryName,
      }),
    );
  };
};
