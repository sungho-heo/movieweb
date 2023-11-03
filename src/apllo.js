import { InMemoryCache, ApolloClient } from "@apollo/client";

const apllo = new ApolloClient({
  uri: "https://www.movieweb.shop/",
  cache: new InMemoryCache(),
});
export default apllo;
