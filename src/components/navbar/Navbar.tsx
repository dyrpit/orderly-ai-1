import { useLocation } from 'react-router-dom';
import group1 from '@assets/group1.svg';
import group2 from '@assets/group2.svg';
import { Link } from 'react-router-dom';
import {
  HStack,
  Image,
  Text,
  Box,
  useBreakpointValue,
  IconButton,
  useDisclosure
} from '@chakra-ui/react';
import GenericButton from '@buttons/GenericButton';
import { navbarStyles } from './NavbarStyles';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import MobileMenu from './MobileMenu';
import { DropdownMenu } from './DropdownMenu.tsx';
import { FileImportModal } from '@components/navbar/FileImportModal.tsx';
import { FileExportAlert } from '@components/navbar/FileExportAlert.tsx';

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();
  const isLg = useBreakpointValue({ base: false, lg: true });
  const token: string | null = sessionStorage.getItem('token');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const exportDialog = useDisclosure();

  return (
    <>
      <HStack style={navbarStyles}>
        {isLg && <Box width='300px' />}
        <Image src={group1} alt="OrderlyAI app logo" />
        <Link to='/' style={{ textDecoration: 'none' }}>
          <Text color='#64ffda' fontSize='xl'>
            Orderly AI
          </Text>
        </Link>
        {isLg ? (
          <>
            {location.pathname === '/' && (
              <GenericButton
                size='large'
                label='Generate APP with chatGPT'
                icon={group2}
              />
            )}
            <GenericButton
              size='small'
              label='EXPORT'
              backgroundColor='rgba(217, 217, 217, 0.15)'
              onClick={exportDialog.onOpen}
            />
            <FileExportAlert isOpen={exportDialog.isOpen} onClose={exportDialog.onClose}/>

            <GenericButton size='small' label='IMPORT' onClick={onOpen} />
            <FileImportModal isOpen={isOpen} onClose={onClose} />

            {token != null ? (
              <DropdownMenu />
            ) : (
              <Text color='#64ffda' as={Link} to='/auth'>
                LOG IN
              </Text>
            )}
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
