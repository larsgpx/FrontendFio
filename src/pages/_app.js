import "@/styles/main.scss";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "@/components/Layout";
import StoreProvider from "@/store/StoreProvider";

export default function App({ Component, pageProps }) {
  return (
    <StoreProvider>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </StoreProvider>
  );
}
