import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem, As, Image, Box
} from '@chakra-ui/react';
import vector from '../../assets/Vector.svg';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { dropdownStyles } from './DropdownStyles.ts';
import { colors } from '../../theme.ts';


interface DropdownMenuProps {
  Button: As & 'button';
}

export const DropdownMenu = ({ Button }: DropdownMenuProps) => {
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.removeItem('token');

    setTimeout(() => {
      navigate('/');
      window.location.reload();
    }, 2000);
    toast.success('Logged out successfully!');
  };

  return (
    <Box>
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton isActive={isOpen} as={Button} style={{backgroundColor: "transparent"}}>
              <Image src={vector} alt='Icon of logged user.' style={{maxWidth: "80%", margin: "auto"}}/>
            </MenuButton>
            <MenuList style={dropdownStyles} minWidth='100px'>
              <MenuItem backgroundColor={"transparent"} _hover={{backgroundColor: colors.bg.gray}}>Admin</MenuItem>
              <MenuItem backgroundColor={"transparent"} _hover={{backgroundColor: colors.bg.gray}} onClick={() => logout()}>Logout</MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
    </Box>
  );
};