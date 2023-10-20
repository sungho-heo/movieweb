import { InMemoryCache, ApolloClient } from "@apollo/client";

const apllo = new ApolloClient({
<<<<<<< HEAD
  uri: "http://0.0.0.0:4000/",
=======
  uri: "http://graphql-api-study-dev.ap-northeast-2.elasticbeanstalk.com",
>>>>>>> movie
  cache: new InMemoryCache(),
});
export default apllo;
