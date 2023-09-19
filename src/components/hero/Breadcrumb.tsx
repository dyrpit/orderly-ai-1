import { useEffect, useState } from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { Flex, Text } from '@chakra-ui/react';

export const Breadcrumb = () => {
  const [breadcrumbNavItems, setBreadcrumbNavItems] = useState<
    string[] | undefined
  >();
  const location = useLocation();

  const transformUrlToBreadcrumb = (websiteUrl: string): string[] => {
    return websiteUrl.split('/').filter((p) => p.length);
  };

  useEffect(() => {
    setBreadcrumbNavItems(transformUrlToBreadcrumb(location.pathname));
  }, [location]);

  if (location.pathname === '/auth') return null;

  return (
    <Flex
      maxW='fit-content'
      minW={{ base: '50%', lg: '310px' }}
      height={{ base: 'fit-content', lg: '42px' }}
      bgColor='bg.gray'
      rounded='xl'
      mt='10px'
      alignItems='center'
      padding='12px'
    >
      <Flex wrap='wrap'>
        <Text
          as={RouterLink}
          to='/'
          color='text.primary'
          fontSize={{ base: '18px', md: '20px' }}
          cursor={'pointer'}
          _hover={{ opacity: 0.8 }}
        >
          HOME
        </Text>
        {breadcrumbNavItems?.map((path) => (
          <BreadcrumbNavElement key={path} path={path} />
        ))}
      </Flex>
    </Flex>
  );
};

const BreadcrumbNavElement = ({ path }: { path: string }) => {
  return (
    <Text
      as={RouterLink}
      to={`/${path}`}
      color='text.primary'
      fontSize={{ base: '18px', md: '20px' }}
      cursor='pointer'
      _hover={{ opacity: 0.8 }}
      _before={{ content: `"/"`, px: '4px' }}
      _last={{ pointerEvents: 'none' }}
    >
      {path.toUpperCase()}
    </Text>
  );
};
