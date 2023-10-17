import { InMemoryCache, ApolloClient } from "@apollo/client";

const apllo = new ApolloClient({
  uri: "http://0.0.0.0:4000/",
  cache: new InMemoryCache(),
});
export default apllo;
