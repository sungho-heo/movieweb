import { InMemoryCache, ApolloClient } from "@apollo/client"

const apllo = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
})
export default apllo
