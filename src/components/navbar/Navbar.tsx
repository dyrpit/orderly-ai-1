import group1 from '../../assets/group1.svg';
import group2 from '../../assets/group2.svg';
import vector from '../../assets/Vector.svg';
import { Link } from 'react-router-dom';
import {
  HStack,
  Image,
  Text,
  Box,
  useBreakpointValue,
  IconButton,
} from '@chakra-ui/react';
import GenericButton from '../buttons/GenericButton';
import { navbarStyles } from './NavbarStyles';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import MobileMenu from './MobileMenu';

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const isLg = useBreakpointValue({ base: false, lg: true });

  return (
    <>
      <HStack style={navbarStyles}>
        {isLg && <Box width='300px' />}
        <Image src={group1} />
        <Text color='#64ffda'>Orderly AI</Text>
        {isLg ? (
          <>
            <GenericButton
              size='large'
              label='Generate APP with chatGPT'
              icon={group2}
            />
            <GenericButton
              size='small'
              label='EXPORT'
              backgroundColor='rgba(217, 217, 217, 0.15)'
            />
            <GenericButton size='small' label='IMPORT' />
            <Text color='#64ffda' as={Link} to='/auth'>
              LOG IN
            </Text>
          </>
        ) : (
          <IconButton
            aria-label='Toggle Navigation'
            icon={isNavOpen ? <CloseIcon /> : <HamburgerIcon />}
            onClick={() => setIsNavOpen((prev) => !prev)}
            color='#64ffda'
          />
        )}
      </HStack>

      <MobileMenu isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
    </>
  );
};
export default Navbar;
