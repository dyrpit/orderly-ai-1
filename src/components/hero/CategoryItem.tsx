import { useAppSelector } from '@/redux/hooks';
import { Link as RouterLink } from 'react-router-dom';
import { Flex, Text, Center } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useDeleteCategory } from '@/hooks/reduxHooks/useDeleteCategory';
import { type TCategory } from '../../types/category';

export const CategoryItem = ({ category }: { category: TCategory }) => {
  const isUserLoggenIn = useAppSelector((state) => state.user.isUserLoggedIn);
  const token = sessionStorage.getItem('token');
  const isAdmin = token && JSON.parse(token).role === 'admin';
  const deleteCategory = useDeleteCategory();

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
      {isUserLoggenIn && (
        <Flex position='absolute' top={4} right={4} gap={4}>
          <EditIcon
            w={{ base: 7, md: 8 }}
            h={{ base: 7, md: 8 }}
            _hover={{ color: 'text.primary', cursor: 'pointer' }}
            transition='all 0.2s ease-in-out'
          />
          {isAdmin && (
            <DeleteIcon
              w={{ base: 7, md: 8 }}
              h={{ base: 7, md: 8 }}
              _hover={{ color: 'text.primary', cursor: 'pointer' }}
              transition='all 0.2s ease-in-out'
              onClick={() =>
                deleteCategory({ categoryName: category.categoryName })
              }
            />
          )}
        </Flex>
      )}
    </Flex>
  );
};
