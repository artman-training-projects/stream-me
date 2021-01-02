import { GraphQLScalarType, Kind } from "graphql";
import { ObjectID } from "mongodb";

export const ObjectIdScalar = new GraphQLScalarType({
  name: "ObjectId",
  description: "Mongo id scalar type",
  parseValue(value: string) {
    //client from input variable
    return new ObjectID(value);
  },
  serialize(value: ObjectID) {
    //value sent to the client
    return value.toHexString();
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      // value from the client query
      return new ObjectID(ast.value);
    }

    return null;
  },
});
