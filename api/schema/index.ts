import path from "path";
import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { ObjectID } from "mongodb";

import { UserResolver } from "../resolvers/UserResolver";
import { AuthResolver } from "../resolvers/AuthResolver";
import { StreamResolver } from "../resolvers/StreamResolver";
import { ObjectIdScalar } from "./object-id.scalar";
import { TypegooseMiddleware } from "../middleware/typegoose";

// build TypeGraphQL executable schema
export default async function createSchema(): Promise<GraphQLSchema> {
  const schema = await buildSchema({
    // add all typesscript resolvers
    resolvers: [UserResolver, AuthResolver, StreamResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),

    // use document converting middleware
    globalMiddlewares: [TypegooseMiddleware],

    // use ObjectId scalar mapping
    scalarsMap: [{ type: ObjectID, scalar: ObjectIdScalar }],
    validate: false,
  });

  return schema;
}
