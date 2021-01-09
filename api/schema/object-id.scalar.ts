import { GraphQLScalarType, Kind } from "graphql";
import { ObjectId } from "mongodb";

export const ObjectIdScalar = new GraphQLScalarType({
  name: "ObjectId",
  description: "Mongo object id scalar type",
  parseValue(value: string) {
    // value from the client input variables
    return new ObjectId(value);
  },
  serialize(value: ObjectId) {
    // value sent to the client
    return value.toHexString();
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      // value from the client query
      return new ObjectId(ast.value);
    }
    return null;
  },
});
