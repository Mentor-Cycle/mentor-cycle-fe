import "../styles/globals.css";
import client from "services/apollo/apollo-client";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
      <ToastContainer />
    </ApolloProvider>
  );
}

export default MyApp;
