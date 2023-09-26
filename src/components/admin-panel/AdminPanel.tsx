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

const AdminPanel = () => {
    const isAdminPanelOpen = useAppSelector(
      (state) => state.adminPanel.isAdminPanelOpen
    );
    const data = useSelector((state: RootState) => ({
      categories: state.categories,
      products: state.products
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

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>, userId: number | undefined) => {
      if (userId) {
        updateData(userId, e.target.value);
      }
    };

    useEffect(() => {
      loadData();
    }, [rerender]);

    if (!isAdminPanelOpen) return null;

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
  }, []);

  if (!isAdminPanelOpen) return null;

  return (
    <div>
      <Box color='white'>
        <Link to={'/addCategory'}>Create New Category</Link>
      </Box>
      <Box color='white'>
        <Link to={'/addProduct'}>Add product</Link>
      </Box>
      <Accordion allowMultiple>
        {data.categories.map((category) => (
          <AccordionItem key={category.id}>
            <h2>
              <AccordionButton onClick={onToggle}>
                <Box
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
                      <Link to={`${product.category}/${product.name}`}>
                        {product.name}
                      </Link>
                    </Box>
                  ))}
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
      <h2 style={{ margin: '5% 5% 0 5%', color: '#64FFDA' }}>Users</h2>
      {userData
        ?.filter((user) => user.id !== userId)
        .map((user) => (
          <Flex
            key={user.id}
            marginY='5px'
            paddingX='5%'
            paddingY='5px'
            justifyContent='space-between'
            alignItems='center'
          >
            <Flex color={'white'} gap='10px'>
              <DeleteIcon
                _hover={{ cursor: 'pointer' }}
                onClick={() => removeData(user.id)}
              />
              <h2>{user.username}</h2>
            </Flex>
            <Box>
              <Select
                placeholder='Select role'
                color={'white'}
                onChange={(e) => handleChange(e, user.id)}
              >
                {user.role === 'admin' ? (
                  <>
                    <option value='admin' disabled>
                      admin
                    </option>
                    <option value='regular'>regular</option>
                  </>
                ) : (
                  <>
                    <option value='admin'>admin</option>
                    <option value='regular' disabled>
                      regular
                    </option>
                  </>
                )}
              </Select>
            </Box>
          </Flex>
        ))}
      ;
    </div>
  );
};
export default AdminPanel;
