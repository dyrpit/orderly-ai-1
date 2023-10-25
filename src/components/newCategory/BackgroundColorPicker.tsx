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


   const generateRandomColor = () => {
     const r = Math.floor(Math.random() * 256);
     const g = Math.floor(Math.random() * 256);
     const b = Math.floor(Math.random() * 256);
     return `rgb(${r}, ${g}, ${b})`;
   };

   useEffect(() => {
     const generatedColors: string[] = [];
     while (generatedColors.length < 8) {
       const randomColor = generateRandomColor();
       if (
         randomColor !== 'rgb(17, 34, 64)' && // Unikamy koloru '#112240'
         !generatedColors.includes(randomColor)
       ) {
         generatedColors.push(randomColor);
       }
     }
     setColorsPalete(generatedColors);
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
