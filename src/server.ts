import { ApolloServer } from "apollo-server";
import { typeDefs } from "./service/schema/typeDefs";
import { resolvers } from "./service/schema/resolvers";

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
