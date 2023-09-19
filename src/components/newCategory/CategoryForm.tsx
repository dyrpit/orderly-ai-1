import { Box, Flex, Grid, Heading, Input } from '@chakra-ui/react';
import { BackgroundColorPicker } from './BackgroundColorPicker';

export const CategoryForm = () => {
  return (
    <Flex
      bg='bg.secondary'
      minH='300px'
      borderRadius='xl'
      direction={{ base: 'column' }}
      overflow='hidden'
      p={{ base: 0, md: 4 }}
    >
      <Box top='247px' left='376px'>
        <Heading
          color='text.secondary'
          fontSize='28px'
          lineHeight='33.6px'
          fontWeight='500'
          p={3}
        >
          Category name
        </Heading>
        <Input
          bg='bg.gray'
          border='none'
          placeholder='New category name'
        ></Input>
      </Box>
      <Heading
        color='text.secondary'
        fontSize='28px'
        lineHeight='33.6px'
        fontWeight='500'
        p={{ base: 0, md: 4 }}
      >
        Select category background color
      </Heading>
      <BackgroundColorPicker />
      <Grid></Grid>
    </Flex>
  );
};
