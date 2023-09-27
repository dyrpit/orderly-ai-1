import { Box, Text, Button, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import noPage from '../../assets/no-page.svg';

const PageNotFound = () => {
  return (
    <Box mt='100px' display="flex" justifyContent="center" alignItems="center" flexDirection="column">
      <Image src={noPage} alt='Page Not Found' />
      <Text fontSize='xl' fontWeight='bold' mt='10'>
        Page Not Found
      </Text>
      <Text fontSize='md' color='gray.500' mt='2'>
        The page you are looking for does not exist.
      </Text>
      <Button
        as={Link}
        to='/'
        colorScheme='teal'
        mt='4'
        size='md'
        textDecoration='none'
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default PageNotFound;
