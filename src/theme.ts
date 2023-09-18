import { extendTheme } from '@chakra-ui/react';

export const colors = {
  black: '#000',
  white: '#fff',
  bg: {
    primary: '#0A192F',
    secondary: '#112240',
    gray: '#d6d9d926',
    lightGray: '#3b3b3b26',
  },
  text: {
    primary: "#64FFDA",
    secondary: "#CCD6F6",
  },
  linksText: "#5E5CBF",
  gradientMobile: {
    background:
      "linear-gradient(90deg, rgba(133, 79, 79, 0)  , rgba(100, 255, 218, 1), rgba(133, 79, 79, 0))",
    height: "2px",
    width: "100%",
  },
  gradientDekstop: {
    background:
      "linear-gradient(90deg, rgba(133, 79, 79, 0)  , rgba(100, 255, 218, 1), rgba(133, 79, 79, 0))",
    height: "2px",
    width: "80%",
    marginLeft: "20%",
  },
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
        backgroundColor: colors.bg.primary,
      },
    },
  },
  colors,
});
