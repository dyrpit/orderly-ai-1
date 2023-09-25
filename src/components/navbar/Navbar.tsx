import group1 from '../../assets/group1.svg';
import group2 from '../../assets/group2.svg';
import { HStack, Image, Text, Box, useBreakpointValue } from '@chakra-ui/react';
import GenericButton from '../Buttons/GenericButton';
import { navbarStyles } from './NavbarStyles';

const Navbar = () => {
  const isLg = useBreakpointValue({ base: false, lg: true });
  return (
    <>
      <HStack style={navbarStyles}>
        {isLg && <Box width="300px" />}
        <Image
          src={group1}
          top={12}
          display="flex"
          justifyContent="space-between"
        />
        <Text color="#64ffda">Orderly AI</Text>
        <GenericButton
          size="large"
          label="Generate APP with chatGPT"
          icon={group2}
        />
        <GenericButton
          size="small"
          label="EXPORT"
          backgroundColor="rgba(217, 217, 217, 0.15)"
        />
        <GenericButton size="small" label="IMPORT" />
        <Text color="#64ffda">LOG IN</Text>
      </HStack>
    </>
  );
};
export default Navbar;
