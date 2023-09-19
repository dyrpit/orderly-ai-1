import { Box, Grid } from '@chakra-ui/react';
import { CircleColorButton } from './CircleColorButton';
import { useState, useEffect } from 'react';

export const BackgroundColorPicker = () => {
  const [activeButtonIndex, setActiveButtonIndex] = useState(null);
  const [colors, setColors] = useState([]);

 
  const handleButtonClick = (index) => {
    setActiveButtonIndex(index);
  };

  useEffect(() => {
    const generatedColors = Array(8)
      .fill(0)
      .map(() => generateRandomColor());
    setColors(generatedColors);
  }, []); 

  function generateRandomColor() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor}`;
  }

  return (
    <Box w='35%' ml='20px'>
      <Grid templateColumns='repeat(4, 1fr)' gap={5}>
        {colors.map((color, index) => (
          <CircleColorButton
            key={index}
            color={color}
            isActive={activeButtonIndex === index}
            onClick={() => handleButtonClick(index)}
          />
        ))}
      </Grid>
    </Box>
  );
};
