import { ApolloProvider } from "@apollo/client";
import { AppContextProvider } from "Providers/user/AppContext";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import client from "services/apollo/apollo-client";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AppContextProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </AppContextProvider>
    </ApolloProvider>
  );
}

export default MyApp;
