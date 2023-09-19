import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter as RouterProvider } from 'react-router-dom';
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import { theme } from './theme.ts';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider>
      <ChakraProvider theme={theme}>
        <ColorModeProvider
          options={{
            initialColorMode: 'dark',
            useSystemColorMode: false,
          }}
        >
          <App />
        </ColorModeProvider>
      </ChakraProvider>
    </RouterProvider>
  </React.StrictMode>,
);
