import { Flex, Text } from '@chakra-ui/react';

export const Footer = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return (
    <Flex
      as='footer'
      bg='bg.primary'
      color='text.secondary'
      align='center'
      justify='center'
      width={{ base: '100%', md: '1170px' }}
      h='100%'
      px={4}
    >
      <Text textAlign='center'>
        © This is the POC for the best app of the world !! | {currentYear}
      </Text>
    </Flex>
  );
};
