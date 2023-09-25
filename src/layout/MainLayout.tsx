import { Box, Grid, GridItem, useBreakpointValue } from '@chakra-ui/react';

import { colors } from '../theme';
import Footer from '@components/footer/Footer';
import { Breadcrumb } from '@components/hero/Breadcrumb';
import Navbar from '@components/navbar/Navbar';
import React from 'react';
import AdminPanel from '@/components/admin-panel/AdminPanel';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const gradientStyle = useBreakpointValue({
    base: colors.gradientMobile,
    md: colors.gradientDekstop,
  });

  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <Grid
      templateAreas={
        isMobile
          ? {
              base: `"nav" "hero" "aside" "footer"`,
              lg: `"nav nav" "hero hero" "aside aside" "footer footer"`,
            }
          : {
              base: `"nav" "hero" "footer"`,
              lg: `"nav nav" "aside hero" "footer footer"`,
            }
      }
      templateColumns={{
        base: '100%',
        lg: '300px 1fr',
      }}
      sx={{
        maxWidth: '1170px',
        width: '100%',
        margin: '0 auto',
      }}
    >
      <GridItem area='nav'>
        <Navbar />
        <Box style={gradientStyle} />
      </GridItem>
      <GridItem area='hero' bg='blue' maxHeight='100%' bgColor={'#0A192F'}>
        <Box bg='bg.primary' w='100%' h='100%' p={4}>
          <Breadcrumb />
          <Box mt={6}>{children}</Box>
        </Box>
      </GridItem>
      {isMobile ? (
        <GridItem
          area='aside'
          sx={{
            display: { base: 'block', lg: 'none' },
          }}
        >
          <Box bg='bg.secondary'>
            <AdminPanel />
          </Box>
        </GridItem>
      ) : (
        <GridItem area='aside' sx={{ display: { base: 'none', lg: 'block' } }}>
          <Box bg='bg.secondary'>
            <AdminPanel />
          </Box>
        </GridItem>
      )}

      <GridItem area='footer' height='120px'>
        <Box style={gradientStyle} />
        <Footer />
      </GridItem>
    </Grid>
  );
};
