import React from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  VStack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import GenericButton from '@buttons/GenericButton';
import group2 from '@assets/group2.svg';

import { Link } from 'react-router-dom';
import { DropdownMenu } from './DropdownMenu.tsx';
import { FileImportModal } from '@components/navbar/FileImportModal.tsx';
import { FileExportAlert } from '@components/navbar/FileExportAlert.tsx';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const token: string | null = sessionStorage.getItem('token');
  const importModal = useDisclosure();
  const exportDialog = useDisclosure();

  return (
    <Drawer placement='right' onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent style={{ marginTop: '50px' }}>
        <DrawerCloseButton />

        <DrawerBody>
          <VStack width='100%' height='100%' justifyContent='space-around'>
            <GenericButton
              size='large'
              label='Generate APP with chatGPT'
              icon={group2}
              onClick={onClose}
            />
            <GenericButton size='small' label='EXPORT' isMobile onClick={exportDialog.onOpen}/>

            <FileExportAlert
              isOpen={exportDialog.isOpen}
              onClose={() => {
                exportDialog.onClose();
                onClose();
              }}/>

            <GenericButton
              size='small'
              label='IMPORT'
              isMobile
              onClick={importModal.onOpen}
            />
            <FileImportModal
              isOpen={importModal.isOpen}
              onClose={() => {
                importModal.onClose();
                onClose();
              }}
            />

            {token != null ? (
              <DropdownMenu />
            ) : (
              <Text color='#64ffda' as={Link} to='/auth' onClick={onClose}>
                LOG IN
              </Text>
            )}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
