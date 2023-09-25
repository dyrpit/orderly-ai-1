import { extendTheme } from '@chakra-ui/react';

const colors = {
  black: '#000',
  white: '#fff',
  bg: {
    primary: '#0A192F',
    secondary: '#112240',
  },
  text: {
    primary: '#64FFDA',
    secondary: '#CCD6F6',
    dark: '#112240',
  },
  linksText: '#5E5CBF',
};

export const theme = extendTheme({
  fonts: {
    body: 'Inter, sans-serif',
  },
  styles: {
    global: {
      'html, body': {
        overflowX: 'hidden',
        color: 'blue.800',
      },
    },
  },
  colors,
});
