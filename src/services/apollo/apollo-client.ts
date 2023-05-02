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

const excludedPaths = [
  "/signup",
  "/request-change-password",
  "terms",
  "privacy-policy",
];

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, ...rest }) => {
      if (
        message.includes("Forbidden resource") &&
        !excludedPaths.some((path) => window.location.pathname.includes(path))
      ) {
        window.location.href = "/signin";
      }
    });
  }
});

const logLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    if (response.data) {
      console.error(`[GraphQL response]: ${JSON.stringify(response.data)}`);
    }
    return response;
  });
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([errorLink, httpLink]),
});

export default client;
