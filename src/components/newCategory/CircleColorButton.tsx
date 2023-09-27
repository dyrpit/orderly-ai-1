import { GridItem, Circle } from '@chakra-ui/react';

export const CircleColorButton = ({
  color,
  isActive,
  onClick,
}: {
  color: string;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <GridItem>
      <Circle
        onClick={onClick}
        size="50px"
        borderRadius='50%'
        backgroundColor={color}
        borderColor={isActive ? 'text.primary' : 'transparent'}
        borderWidth='3px'
        _hover={{ borderColor: 'text.primary', cursor: 'pointer' }}
        transition='all 0.2s ease-out'
      />
    </GridItem>
  );
};
