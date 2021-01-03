import {
  Resolver,
  Query,
  Mutation,
  Field,
  Ctx,
  Arg,
  Root,
  UseMiddleware,
} from "type-graphql";
import { ObjectID } from "mongodb";
import { MyContext } from "../types/MyContext";
import { User, UserModel } from "../entity/User";
import { Stream, StreamModel } from "../entity/Stream";
import { ObjectIdScalar } from "../schema/object-id.scalar";
import { StreamInput } from "../types/StreamInput";
import { isAuth } from "../middleware/isAuth";

@Resolver(() => Stream)
export class StreamResolver {
  @Query(() => Stream, { nullable: true })
  stream(@Arg("streamId", () => ObjectIdScalar) streamId: ObjectID) {
    // Find a single string
    return StreamModel.findById(streamId);
  }

  @Query(() => [Stream])
  @UseMiddleware(isAuth)
  streams(@Ctx() ctx: MyContext) {
    // Display all streams for the current user
    return StreamModel.find({ author: ctx.res.locals.userId });
  }

  @Mutation(() => Stream)
  @UseMiddleware(isAuth)
  async addStream(
    @Arg("input") streamInput: StreamInput,
    @Ctx() ctx: MyContext
  ): Promise<Stream> {
    // Create a new user stream
    const stream = new StreamModel({
      ...streamInput,
      author: ctx.res.locals.userId,
    } as Stream);

    await stream.save();
    return stream;
  }
}
