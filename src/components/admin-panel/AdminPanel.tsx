import { useAppSelector } from '@/redux/hooks';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../redux/store';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  VStack,
  Text,
  Select,
  useDisclosure,
} from '@chakra-ui/react';
import { adminPanelStyles } from './AdminPanelStyles';

import React, { useEffect, useState } from 'react';
import { getAllUsers, removeUser, updateUser } from '@util/api-calls.ts';
import { TUser } from '@/types/user.ts';
import { Flex } from '@chakra-ui/layout';
import toast from 'react-hot-toast';
import { DeleteIcon } from '@chakra-ui/icons';

export const AdminPanel = () => {
  const isAdminPanelOpen = useAppSelector(
    (state) => state.adminPanel.isAdminPanelOpen,
  );
  const data = useSelector((state: RootState) => ({
    categories: state.categories,
    products: state.products,
  }));
  const [userData, setUserData] = useState<TUser[]>();
  const [rerender, setRerender] = useState(false);

  const { onToggle } = useDisclosure();
  const token: string | null = sessionStorage.getItem('token');
  let userId: number | null;

  if (token) {
    userId = JSON.parse(token).userId;
  }

  const loadData = async () => {
    await getAllUsers()
      .then((res) => setUserData(res.data))
      .catch((err) => {
        throw new Error(err);
      });
  };

  const updateData = async (userId: number, role: string) => {
    await updateUser(userId, role)
      .then((res) => {
        console.log(res.data);
        setRerender(!rerender);
        toast.success('User updated successfully!');
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  const removeData = async (userId: number | undefined) => {
    if (userId) {
      const response = confirm('Are you sure you want to remove this user?');

      if (response) {
        await removeUser(userId)
          .then((res) => {
            console.log(res.data);
            setRerender(!rerender);
            toast.success('User removed successfully!');
          })
          .catch((err) => {
            throw new Error(err);
          });
      }
    } else {
      alert('Something went wrong...');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    userId: number | undefined,
  ) => {
    if (userId) {
      updateData(userId, e.target.value);
    }
  };

  useEffect(() => {
    loadData();
  }, [rerender]);

  if (!isAdminPanelOpen) return null;

  return (
    <Flex
      direction='column'
      minH='100%'
      justifyContent='space-between'
      minW={{ base: '100%', md: '350px' }}
      overflowY={{ base: 'hidden', md: 'scroll' }}
      paddingLeft={{ base: 0, md: 4 }}
      paddingY={4}
      gap={3}
      sx={{
        '&::-webkit-scrollbar': {
          width: '4px',
        },

        '&::-webkit-scrollbar-track': {
          width: '6px',
        },

        '&::-webkit-scrollbar-thumb': {
          background: 'text.primary',

          borderRadius: '24px',
        },
      }}
    >
      <Text color='white' pl={4} as={Link} to={'/addCategory'}>
        Create New Category
      </Text>
      <Text color='white' pl={4} as={Link} to={'/addProduct'}>
        Add product
      </Text>
      <Accordion allowMultiple>
        {data.categories.map((category) => (
          <AccordionItem key={category.id}>
            <h2>
              <AccordionButton onClick={onToggle}>
                <Box
                  textTransform='capitalize'
                  style={adminPanelStyles}
                  as='span'
                  flex='1'
                  textAlign='left'
                >
                  {category.categoryName}
                </Box>
                <AccordionIcon style={adminPanelStyles} />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <VStack color='white' align='stretch'>
                {data.products
                  .filter(
                    (product) => product.category === category.categoryName,
                  )
                  .map((product) => (
                    <Box key={product.id}>
                      <Link to={`/category/${product.category}/${product.name}`}>
                        {product.name}
                      </Link>
                    </Box>
                  ))}
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
      <Text pt={4} pl={4} fontSize='xl' color='white'>
        Users
      </Text>

      <Flex direction='column' gap={4}>
        {userData

          ?.filter((user) => user.id !== userId)

          .map((user) => (
            <Flex
              key={user.id}
              paddingX={4}
              justifyContent='space-between'
              alignItems='center'
            >
              <Flex color='white' gap={4} align='center'>
                <DeleteIcon
                  _hover={{ cursor: 'pointer' }}
                  onClick={() => removeData(user.id)}
                />

                <Text fontSize={18} color='text.secondary'>
                  {user.username}
                </Text>
              </Flex>

              <Box>
                <Select
                  color={'white'}
                  _hover={{ cursor: 'pointer' }}
                  onChange={(e) => handleChange(e, user.id)}
                  defaultValue='current'
                >
                  {user.role === 'admin' ? (
                    <>
                      <option value='current' disabled>
                        admin
                      </option>

                      <option value='regular'>regular</option>
                    </>
                  ) : (
                    <>
                      <option value='admin'>admin</option>

                      <option value='current' disabled>
                        regular
                      </option>
                    </>
                  )}
                </Select>
              </Box>
            </Flex>
          ))}
      </Flex>
    </Flex>
  );
};
