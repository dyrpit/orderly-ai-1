import { Box, Grid } from '@chakra-ui/react';
import { CircleColorButton } from './CircleColorButton';
import { useState, useEffect } from 'react';

export const BackgroundColorPicker = ({
  setSelectedColor,
}: {
  setSelectedColor: (color: string) => void;
}) => {
  const [activeButtonIndex, setActiveButtonIndex] = useState<number | null>(
    null,
  );
  const [colorsPalete, setColorsPalete] = useState<string[]>([]);

  const handleButtonClick = (index: number) => {
    setActiveButtonIndex(index);
  };

  useEffect(() => {
    const generateRandomColor = () => {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      return `#${randomColor}cc`;
    };
    setColorsPalete(Array.from({ length: 8 }, () => generateRandomColor()));
  }, []);

  return (
    <Box w='35%'>
      <Grid templateColumns='repeat(4, 1fr)' gap={5}>
        {colorsPalete.map((color, index) => (
          <CircleColorButton
            key={index}
            color={color}
            isActive={activeButtonIndex === index}
            onClick={() => {
              handleButtonClick(index), setSelectedColor(color);
            }}
          />
        ))}
      </Grid>
    </Box>
  );
};
