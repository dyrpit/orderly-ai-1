import { useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

export const AiSwitch = () => {
  const [isSwitchActive, setIsSwitchActive] = useState(false);

  const toggleSwitchHandle = () => {
    isSwitchActive ? setIsSwitchActive(false) : setIsSwitchActive(true);
  };

  return (
    <Flex
      w='fit-content'
      backgroundColor='bg.counter'
      py={2}
      px={2}
      h={10}
      gap={6}
      justify='space-between'
      alignItems='center'
      borderRadius={40}
      _hover={{ cursor: 'pointer' }}
      onClick={toggleSwitchHandle}
    >
      <Text
        color={isSwitchActive ? 'text.primary' : 'text.secondary'}
        fontSize={{ base: 13, md: 16 }}
        transition='all 0.2s ease-out'
      >
        Build App with chatGPT
      </Text>
      <Box
        position='relative'
        backgroundColor='bg.secondary'
        w={20}
        h={8}
        p={1}
        borderRadius={40}
        transition='all 0.2s ease-out'
      >
        <Flex
          position='absolute'
          borderRadius={99}
          w='fit-content'
          h='fit-content'
          justify='center'
          alignItems='center'
          backgroundColor='bg.counter'
          p={1}
          sx={{
            transform: isSwitchActive ? 'translateX(200%)' : 'translateX(0px)',
          }}
          transition='all 0.2s ease-out'
        >
          <StarIcon
            color={isSwitchActive ? 'text.primary' : 'bg.secondary'}
            w={4}
            h={4}
            transition='all 0.2s ease-out'
          />
        </Flex>
      </Box>
    </Flex>
  );
};
