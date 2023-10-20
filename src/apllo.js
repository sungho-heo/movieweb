import { InMemoryCache, ApolloClient } from "@apollo/client";

const apllo = new ApolloClient({
  uri: "http://graphql-api-study-dev.ap-northeast-2.elasticbeanstalk.com",
  cache: new InMemoryCache(),
});
export default apllo;
