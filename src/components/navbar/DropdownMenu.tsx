import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toggleAdminPanel } from '@/redux/features/adminPanel/adminPanelSlice';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Box,
  Button,
  Avatar,
} from '@chakra-ui/react';
import vector from '@assets/Vector.svg';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { dropdownStyles } from './DropdownStyles.ts';
import { colors } from '@/theme.ts';
import {
  resetUserLogin,
  setUnLoggedUser,
} from '@/redux/features/user/userSlice.ts';

export const DropdownMenu = () => {
  const dispatch = useAppDispatch();
  const isAdminPanelOpen = useAppSelector(
    (state) => state.adminPanel.isAdminPanelOpen,
  );
  const token: string | null = sessionStorage.getItem('token') || '';
  const isAdmin = token && JSON.parse(token).role === 'admin';

  const isLogged = useAppSelector((state) => state.user.isUserLoggedIn);
  const loginUserName = useAppSelector((state) => state.user.userLogin);

  const navigate = useNavigate();
  const logout = () => {
    isAdminPanelOpen && toggleAdminPanelHandler();
    sessionStorage.removeItem('token');
    dispatch(setUnLoggedUser());
    dispatch(resetUserLogin());
    navigate('/');
    toast.success('Logged out successfully!');
  };

  const toggleAdminPanelHandler = () => {
    dispatch(toggleAdminPanel());
  };

  return (
    <Box>
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              isActive={isOpen}
              as={Button}
              w='100%'
              h='100%'
              p={0}
              style={{ backgroundColor: 'transparent' }}
            >
              {isLogged ? (
                <Avatar
                  color={colors.bg.primary}
                  bg={colors.text.primary}
                  size='md'
                  name={loginUserName?.substring(0, 2).split('').join(' ')}
                />
              ) : (
                <Image src={vector} alt='Icon of logged user.' />
              )}
            </MenuButton>
            <MenuList style={dropdownStyles} minWidth='100px' zIndex={99}>
              {isAdmin && (
                <MenuItem
                  backgroundColor={'transparent'}
                  _hover={{ backgroundColor: colors.bg.gray }}
                  onClick={toggleAdminPanelHandler}
                >
                  Admin
                </MenuItem>
              )}

              <MenuItem
                backgroundColor={'transparent'}
                _hover={{ backgroundColor: colors.bg.gray }}
                onClick={() => logout()}
              >
                Logout
              </MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
    </Box>
  );
};
