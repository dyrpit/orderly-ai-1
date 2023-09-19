import { GridItem, Circle } from '@chakra-ui/react';

export const CircleColorButton = ({ color, isActive, onClick }) => {
  return (
    <GridItem>
      <Circle
        onClick={onClick}
        w='50px'
        h='50px'
        borderRadius='50%'
        backgroundColor={color}
        borderColor={isActive ? 'white' : 'transparent'} // Białe obramowanie dla aktywnego przycisku
        borderWidth='3px' // Grubość obramowania
        _hover={{ borderColor: '#D9D9D9' }}
      />
    </GridItem>
  );
};
