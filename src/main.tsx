import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter as RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </RouterProvider>
  </React.StrictMode>
);
