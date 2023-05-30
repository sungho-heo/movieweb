import { InMemoryCache, ApolloClient, gql } from "@apollo/client"

const apllo = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
})

apllo
  .query({
    query: gql`
      {
        allMovies {
          id
          original_language
          overview
        }
      }
    `,
  })
  .then((data) => console.log(data))

export default apllo
