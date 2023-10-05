import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  // uri: "http://localhost:4000/",
  uri: "http://localhost:4173/",
  cache: new InMemoryCache(),
});

export default client;
