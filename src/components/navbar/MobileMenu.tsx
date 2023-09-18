// MobileMenu.tsx
import React from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  VStack,
  Text,
} from '@chakra-ui/react';
import GenericButton from '../buttons/GenericButton';
import group2 from '../../assets/group2.svg';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
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
            />
            <GenericButton size='small' label='EXPORT' isMobile />
            <GenericButton size='small' label='IMPORT' />
            <Text color='#64ffda' as='button'>
              LOG IN
            </Text>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
