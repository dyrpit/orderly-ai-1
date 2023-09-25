import { Box, Flex, Text } from '@chakra-ui/react';

/* type TBreadcrumbProps = {
  id: string,
  route: string,
} */

export const Breadcrumb = () => {
  return (
    <Flex
      width={{ base: '50%', lg: '310px' }}
      height={{ base: '30px', lg: '42px' }}
      bgColor={'rgba(217,217,217,0.15)'}
      rounded={'xl'}
      mt={'10px'}
      alignItems={'center'}
      padding="12px"
    >
      <Box>
        <Text color={'#64FFDA'} fontSize={'24px'} cursor={'pointer'}>
          Home
        </Text>
      </Box>
    </Flex>
  );
};
