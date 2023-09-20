import { Link as RouterLink } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import {
  deleteCategory,
  editCategoryName,
} from '../../redux/features/categories/categoriesSlice';
import { Flex, Text, Center, Button, Box } from '@chakra-ui/react';
import { type TCategories } from '../../types/categories';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

const isLogged: boolean = true;
const isAdmin: boolean = true;

export const CategoryItem = ({
  category,
}: {
  category: Omit<TCategories, 'products'>;
}) => {
  const dispatch = useAppDispatch();

  const deleteCategoryHandle = (id: number): void => {
    dispatch(
      deleteCategory({
        id,
      }),
    );
  };

  const editCategoryHandle = () => {
    dispatch(editCategoryName());
  };

  return (
    <>
      {isLogged && isAdmin && (
        <>
          <Box>
            <Button
              colorScheme='teal'
              variant='outline'
              leftIcon={<DeleteIcon />}
              onClick={() => deleteCategoryHandle(category.id)}
              zIndex={999}
            />
          </Box>
          {/* <Box>
            <Button
              colorScheme='teal'
              variant='outline'
              leftIcon={<EditIcon />}
              onClick={() => deleteCategoryHandle(category.id)}
              zIndex={999}
            />
          </Box> */}
        </>
      )}
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
    </>
  );
};
