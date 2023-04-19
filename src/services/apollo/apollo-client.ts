import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://mentor-cycle-be-dev.onrender.com/graphql",
  // uri: "http://localhost:3030/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

export default client;
