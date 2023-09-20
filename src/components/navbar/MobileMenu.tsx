// MobileMenu.tsx
import React from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  VStack,
  Text, Image
} from '@chakra-ui/react';
import GenericButton from '../buttons/GenericButton';
import group2 from '../../assets/group2.svg';
import vector from '../../assets/Vector.svg';
import { Link } from 'react-router-dom';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const token: string | null = sessionStorage.getItem('token');

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
            <GenericButton size='small' label='IMPORT' isMobile />
            {token != null ? (<Image src={vector} alt='Icon of logged user.' />) : (
              <Text color='#64ffda' as={Link} to='/auth'>
                LOG IN
              </Text>)}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
