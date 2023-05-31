import { ApolloProvider } from "@apollo/client";
import Header from "@components/Header";
import type { AppProps } from "next/app";
import { initialValue, UserContext } from "providers/user/AppContext";
import { useState, useMemo } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import client from "services/apollo/apollo-client";
import "../styles/globals.css";
import { useRouter } from "next/router";
import { ROUTES_WITHOUT_HEADER } from "config/constants";
import { MultiStepFormProvider } from "providers/form";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState(initialValue);
  const router = useRouter();
  const userContextValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  const showHeader = !ROUTES_WITHOUT_HEADER.includes(router.pathname);
  return (
    <ThemeProvider enableSystem={true} defaultTheme="dark" attribute="class">
      <ApolloProvider client={client}>
        <UserContext.Provider value={userContextValue}>
          {showHeader && <Header />}
          <MultiStepFormProvider>
            <Component {...pageProps} />
          </MultiStepFormProvider>
          <ToastContainer />
        </UserContext.Provider>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default MyApp;
