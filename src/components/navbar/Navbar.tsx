import { useLocation } from 'react-router-dom';
import group1 from '@assets/group1.svg';
import group2 from '@assets/group2.svg';
import { Link } from 'react-router-dom';
import {
  Image,
  Text,
  Box,
  useBreakpointValue,
  IconButton,
  useDisclosure,
  Flex,
} from '@chakra-ui/react';
import GenericButton from '@buttons/GenericButton';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import MobileMenu from './MobileMenu';
import { DropdownMenu } from './DropdownMenu.tsx';
import { FileImportModal } from '@components/navbar/FileImportModal.tsx';
import { FileExportAlert } from '@components/navbar/FileExportAlert.tsx';
import { useAppSelector } from '@/redux/hooks.ts';

export const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();
  const isLg = useBreakpointValue({ base: false, lg: true });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const exportDialog = useDisclosure();
  const isLogged = useAppSelector((state) => state.user.isUserLoggedIn);

  return (
    <>
      <Flex
        width='100%'
        maxW='1170px'
        align='center'
        justify='space-between'
        h='100%'
      >
        <Box>
          <Flex
            as={Link}
            to='/'
            style={{ textDecoration: 'none' }}
            gap={4}
            align='center'
          >
            <Image src={group1} alt='OrderlyAI app logo' />
            <Text color='#64ffda' fontSize='xl'>
              Orderly AI
            </Text>
          </Flex>
        </Box>
        {isLg ? (
          <>
            {location.pathname === '/' && (
              <GenericButton
                size='large'
                label='Generate APP with chatGPT'
                icon={group2}
              />
            )}
            <Flex gap={4} align='center'>
              {isLogged && (
                <>
                  <GenericButton
                    size='small'
                    label='EXPORT'
                    backgroundColor='rgba(217, 217, 217, 0.15)'
                    onClick={exportDialog.onOpen}
                  />
                </>
              )}
              <FileExportAlert
                isOpen={exportDialog.isOpen}
                onClose={exportDialog.onClose}
              />

              {isLogged && (
                <GenericButton size='small' label='IMPORT' onClick={onOpen} />
              )}
              <FileImportModal isOpen={isOpen} onClose={onClose} />

              {isLogged ? (
                <DropdownMenu onClose={onClose} />
              ) : (
                <Text color='#64ffda' as={Link} to='/auth'>
                  LOG IN
                </Text>
              )}
              <Flex />
            </Flex>
          </>
        ) : (
          <IconButton
            aria-label='Toggle Navigation'
            icon={isNavOpen ? <CloseIcon /> : <HamburgerIcon />}
            onClick={() => setIsNavOpen((prev) => !prev)}
            color='#64ffda'
          />
        )}
      </Flex>
      <MobileMenu isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
    </>
  );
};
