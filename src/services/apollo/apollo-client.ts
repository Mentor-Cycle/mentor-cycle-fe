import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({
  // uri: "https://mentor-cycle-be-dev.onrender.com/graphql",
  uri: `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
  credentials: "include",
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, ...rest }) => {
      if (
        message.includes("Forbidden resource") &&
        !window.location.pathname.includes("signup") &&
        !window.location.pathname.includes("request-change-password")
      ) {
        window.location.href = "/signin";
      }
      console.error(`[GraphQL error]: ${message}`);
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

const logLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    if (response.data) {
      console.log(`[GraphQL response]: ${JSON.stringify(response.data)}`);
    }
    return response;
  });
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([errorLink, httpLink]),
});

export default client;
