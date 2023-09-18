import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Flex, Text } from '@chakra-ui/react';

/* type TBreadcrumbProps = {
  id: string,
  route: string,
} */

export const Breadcrumb = () => {
  const [path, setPath] = useState<string>('/');

  const location = useLocation();

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  return (
    <Flex
      maxW='fit-content'
      minW={{ base: '50%', lg: '310px' }}
      height={{ base: '30px', lg: '42px' }}
      bgColor={'rgba(217,217,217,0.15)'}
      rounded={'xl'}
      mt={'10px'}
      alignItems={'center'}
      padding='12px'
    >
      <Flex>
        <Link to='/'>
          <Text color={'#64FFDA'} fontSize={'24px'} cursor={'pointer'}>
            Home
          </Text>
        </Link>
        <Text color={'#64FFDA'} fontSize={'24px'} cursor={'pointer'}>
          {path}
        </Text>
      </Flex>
    </Flex>
  );
};
