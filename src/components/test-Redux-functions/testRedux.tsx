import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  deleteProduct,
  deleteAllProducts,
} from '@/redux/features/products/productsSlice';
import { Button, Box, Flex, Center, Text } from '@chakra-ui/react';
import { addCategory } from '@/redux/features/categories/categoriesSlice';
import { useDeleteCategory } from '@/hooks/reduxHooks/useDeleteCategory';
import { useAddProduct } from '@/hooks/reduxHooks/useAddProduct';

const TestRedux = () => {
  const dispatch = useAppDispatch();

  const deleteCategory = useDeleteCategory();
  const addProduct = useAddProduct();

  const categories = useAppSelector((state) => state.categories);
  const products = useAppSelector((state) => state.products);

  const allWritingProducts = products.filter((p) => p.category === 'writing');

  const deleteProductHandler = (id: number) => {
    dispatch(
      deleteProduct({
        id,
      }),
    );
  };

  const addNewCategoryHandler = () => {
    dispatch(
      addCategory({
        id: 10,
        categoryName: 'madafaka',
        backgroundColor: '#444',
        href: 'madafaka',
      }),
    );
  };

  const deleteAllProductsOfCategoryHandler = (category: string) => {
    dispatch(
      deleteAllProducts({
        category,
      }),
    );
  };

  return (
    <Box>
      <Center>
        <Text>Here we will test all redux functions</Text>
      </Center>
      <Flex alignItems='center' direction='column' gap={5}>
        <Button variant='outline' onClick={() => deleteProductHandler(1)}>
          Dalete product of 1 id
        </Button>
        <Button variant='outline' onClick={() => addNewCategoryHandler()}>
          Add new category called madafaka
        </Button>
        <Button
          color='green'
          onClick={() => deleteCategory({ categoryName: 'writing' })}
        >
          Delete category using hook
        </Button>
        <Button
          color='yellow'
          onClick={() =>
            addProduct({
              id: 99,
              category: 'writing',
              name: 'new product',
              description: 'fajny opis',
              cost: 'free',
              videoURL: 'www.youtube.pl',
              websiteURL: 'www.nowyproduct.pl',
            })
          }
        >
          Add new product to productivity category
        </Button>

        <Button onClick={() => deleteAllProductsOfCategoryHandler('writing')}>
          Delete all products from writing category
        </Button>

        <Text color='white' mt={5}>
          All categories
        </Text>
        {categories.map((category) => (
          <Text color={category.backgroundColor}>{category.categoryName}</Text>
        ))}

        <Text color='white'>All products of writing category</Text>

        {allWritingProducts.map((product) => (
          <Text color='white'>{product.name}</Text>
        ))}
      </Flex>
    </Box>
  );
};

export default TestRedux;
