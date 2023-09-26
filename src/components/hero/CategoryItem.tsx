import { useAppSelector } from '@/redux/hooks';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Flex, Text, Center, Button, VStack, Input } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useDeleteCategory } from '@/hooks/reduxHooks/useDeleteCategory';
import { useEditCategoryName } from '@/hooks/reduxHooks/useEditCategoryName';
import { type TCategory } from '../../types/category';
import toast from 'react-hot-toast';

export const CategoryItem = ({ category }: { category: TCategory }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedCategoryName, setEditedCategoryName] = useState(
    category.categoryName,
  );

  const deleteCategory = useDeleteCategory();
  const editCategoryName = useEditCategoryName();

  const isUserLoggenIn = useAppSelector((state) => state.user.isUserLoggedIn);
  const token = sessionStorage.getItem('token');
  const isAdmin = token && JSON.parse(token).role === 'admin';

  const deleteCategoryHandle = () => {
    deleteCategory({ categoryName: category.categoryName });
    toast.success('Category deleted');
  };

  const editCategoryNameHandle = () => {
    setEditMode(true);
  };

  const inputChangeHandle = (e) => {
    setEditedCategoryName(e.target.value);
  };

  const saveCategoryNameHandle = () => {
    if (editedCategoryName !== category.categoryName) {
      editCategoryName({
        categoryName: category.categoryName,
        newCategoryName: editedCategoryName,
      });
    }
    toast.success('Category name changed');
    setEditMode(false);
  };

  return (
    <Flex
      position='relative'
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
      {editMode ? (
        <VStack>
          <Input
            type='text'
            fontSize={24}
            value={editedCategoryName.toUpperCase()}
            onChange={inputChangeHandle}
            autoFocus
          />
          <Button
            variant='outline'
            borderColor='text.primary'
            color='text.primary'
            onClick={saveCategoryNameHandle}
          >
            Save
          </Button>
        </VStack>
      ) : (
        <RouterLink
          to={`/${category.categoryName}`}
          style={{ width: '100%', height: '100%', textDecoration: 'none' }}
        >
          <Center width='100%' height='100%'>
            <Text
              fontSize={{ base: 28, md: 34 }}
              color='text.dark'
              fontWeight='bold'
              textAlign='center'
            >
              {category.categoryName.toUpperCase()}
            </Text>
          </Center>
        </RouterLink>
      )}
      {isUserLoggenIn && (
        <Flex position='absolute' top={4} right={4} gap={4}>
          <EditIcon
            w={{ base: 7, md: 8 }}
            h={{ base: 7, md: 8 }}
            _hover={{ color: 'text.primary', cursor: 'pointer' }}
            color={editMode ? 'text.primary' : 'text.dark'}
            transition='all 0.2s ease-in-out'
            onClick={editCategoryNameHandle}
          />
          {isAdmin && (
            <DeleteIcon
              w={{ base: 7, md: 8 }}
              h={{ base: 7, md: 8 }}
              _hover={{ color: 'text.primary', cursor: 'pointer' }}
              color='text.dark'
              transition='all 0.2s ease-in-out'
              onClick={deleteCategoryHandle}
            />
          )}
        </Flex>
      )}
    </Flex>
  );
};
