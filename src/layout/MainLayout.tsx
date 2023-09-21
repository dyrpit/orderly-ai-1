import {
  Box,
  Grid,
  GridItem,
  Show,
  useBreakpointValue,
} from '@chakra-ui/react';

import { colors } from '../theme';
import Footer from '@components/footer/Footer';
import { Breadcrumb } from '@components/hero/Breadcrumb';
import Navbar from '@components/navbar/Navbar';
import React from 'react';
import AdminPanel from '@/components/admin-panel/AdminPanel';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoutes } from '@util/ProtectedRoutes.tsx';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const gradientStyle = useBreakpointValue({
    base: colors.gradientMobile,
    md: colors.gradientDekstop,
  });

  return (
    <Grid
      templateAreas={{
        base: `"nav" "hero" "footer"`,
        lg: `"nav nav" "aside hero" "footer footer"`,
      }}
      templateColumns={{
        base: '100% 1fr',
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
      <GridItem
        area='hero'
        bg='blue'
        minHeight='100vw'
        maxHeight='100%'
        bgColor={'#0A192F'}
      >
        <Box bg='bg.primary' w='100%' h='100%' p={4}>
          <Breadcrumb />
          <Box mt={6}>{children}</Box>
        </Box>
      </GridItem>
      <Show above='lg'>
        <GridItem area='aside' sx={{ display: { base: 'none', lg: 'block' } }}>
          <Box bg='bg.secondary'>
            <Routes>
              <Route element={<ProtectedRoutes/>}>
                <Route path="/admin" element={<AdminPanel />} />
              </Route>
            </Routes>
          </Box>
        </GridItem>
      </Show>
      <GridItem area='footer' height='120px'>
        <Box style={gradientStyle} />
        <Footer />
      </GridItem>
    </Grid>
  );
};
