import { ApolloProvider } from "@apollo/client";
import Header from "@components/Header";
import type { AppProps } from "next/app";
import { UserProvider } from "providers/user/AppContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import client from "services/apollo/apollo-client";
import "../styles/globals.css";
import { useRouter } from "next/router";
import { ROUTES_WITHOUT_HEADER } from "config/constants";
import { ThemeProvider } from "next-themes";
import ClientOnly from "@components/LandingPage/ClientOnly";
import { ModalProvider } from "contexts/ModalContext";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const showHeader = !ROUTES_WITHOUT_HEADER.includes(router.pathname);
  return (
    <ThemeProvider enableSystem={true} defaultTheme="dark" attribute="class">
      <ApolloProvider client={client}>
        <UserProvider>
          <ModalProvider>
            {showHeader && <Header />}
            <ClientOnly>
              <Component {...pageProps} />
            </ClientOnly>
            <ToastContainer />
          </ModalProvider>
        </UserProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default MyApp;
