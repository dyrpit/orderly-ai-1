import { Box, Flex } from '@chakra-ui/react';
import { Navbar } from '@/components/navbar/Navbar';
import { Breadcrumb } from '@/components/hero/Breadcrumb';
import { AdminPanel } from '@/components/admin-panel/AdminPanel';
import { Footer } from '@/components/footer/Footer';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PageWrapper>
      <Flex direction='column' alignItems='center'>
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>

        <Flex
          h={{ base: '100%', md: 'calc(100vh - 160px)' }}
          w='100%'
          maxW='1170px'
          direction={{ base: 'column', md: 'row' }}
        >
          <AdminPanel />
          <MainContentWrapper>
            <Breadcrumb />
            <Box mt={6} overflowY='auto'>
              {children}
            </Box>
          </MainContentWrapper>
        </Flex>
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </Flex>
    </PageWrapper>
  );
};

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      maxW='100vw'
      maxH={{ base: '100%', md: '100vh' }}
      bgColor='bg.primary'
      overflow={{ base: 'scroll', md: 'hidden' }}
    >
      {children}
    </Box>
  );
};

const NavbarWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex
      w='100%'
      maxW='1170px'
      h='80px'
      alignItems='center'
      justifyContent='center'
      direction='column'
      px={4}
    >
      {children}
      <Box
        w='100vw'
        sx={{
          background:
            'linear-gradient(90deg, rgba(133, 79, 79, 0)  , rgba(100, 255, 218, 1), rgba(133, 79, 79, 0))',
          height: '2px',
          width: '100vw',
        }}
      />
    </Flex>
  );
};

const MainContentWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      bg='bg.primary'
      w='100%'
      h='100%'
      p={4}
      overflow='auto'
      sx={{
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'text.primary',
          borderRadius: '24px',
        },
      }}
    >
      {children}
    </Box>
  );
};

const FooterWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex
      w='100%'
      h='80px'
      alignItems='center'
      justifyContent='center'
      direction='column'
    >
      <Box
        w='100vw'
        sx={{
          background:
            'linear-gradient(90deg, rgba(133, 79, 79, 0)  , rgba(100, 255, 218, 1), rgba(133, 79, 79, 0))',
          height: '2px',
          width: '100vw',
        }}
      />
      {children}
    </Flex>
  );
};
