import { ApolloServer } from "apollo-server";
import { typeDefs } from "./service/schema/typeDefs";
import { resolvers } from "./service/schema/resolvers";
import { mongoose } from "@typegoose/typegoose";
import config from "./helpers/config";
import { context } from "./service/schema/context";

const server = new ApolloServer({ typeDefs, resolvers, context });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  mongoose
    .connect(config.MONGO_URI)
    .then(() => console.log("Connected to MongoDB Database"))
    .catch((error) =>
      console.log("Couldn't connect to MongoDB", error.message)
    );
  console.log(`🚀  Server ready at ${url}`);
});
