import { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { Flex, Text } from '@chakra-ui/react';

export const Breadcrumb = () => {
  const [breadcrumbNavItems, setBreadcrumbNavItems] = useState<
    string[] | undefined
  >();
  const location = useLocation();

  const isAdminPanelOpen = useAppSelector(
    (state) => state.adminPanel.isAdminPanelOpen,
  );

  const transformUrlToBreadcrumb = (websiteUrl: string): string[] => {
    return websiteUrl
      .split('/')
      .filter((word) => word !== 'category')
      .filter((p) => p.length)
      .map((item) => item.replace(/%20/g, ' '));
  };

  useEffect(() => {
    setBreadcrumbNavItems(transformUrlToBreadcrumb(location.pathname));
  }, [location]);

  if (location.pathname === '/auth') return null;
  if (isAdminPanelOpen) return null;

  return (
    <Flex
      position='fixed'
      zIndex={999}
      maxW='92%'
      minW='fit-content'
      height={{ base: 'fit-content', lg: '42px' }}
      bgColor='bg.counter'
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
      to={`/category/${path}`}
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
