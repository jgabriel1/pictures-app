import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { AppProvider } from '../contexts';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </ChakraProvider>
  );
}
export default MyApp;
