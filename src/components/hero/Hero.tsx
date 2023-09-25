import { Box } from '@chakra-ui/react';

import { Breadcrumb } from './Breadcrumb';
import { CategoriesList } from './CategoriesList';

export const Hero = () => {
  return (
    <Box bg="bg.primary" w="100%" h="100%" p={4}>
      <Breadcrumb />
      <Box mt={6}>
        <CategoriesList />
      </Box>
    </Box>
  );
};
