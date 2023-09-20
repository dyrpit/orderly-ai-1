import { useAppDispatch } from '@/redux/hooks';
import { addProduct } from '@/redux/features/products/productsSlice';
import { type TProduct } from '@/types/product';

export const useAddProduct = () => {
  const dispatch = useAppDispatch();

  return ({
    id,
    name,
    category,
    websiteURL,
    videoURL,
    description,
    cost,
  }: TProduct) => {
    dispatch(
      addProduct({
        id,
        name,
        category,
        websiteURL,
        videoURL,
        description,
        cost,
      }),
    );
  };
};
