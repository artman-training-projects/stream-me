import { Arg, Mutation, Resolver } from "type-graphql";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserModel } from "../entity/User";
import { AuthInput } from "../types/AuthInput";
import { UserResponce } from "../types/UserResponce";

@Resolver()
export class AuthResolver {
  @Mutation(() => UserResponce)
  async register(
    @Arg("input") { email, password }: AuthInput
  ): Promise<UserResponce> {
    // Check for an existing email
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      throw new Error("Email already in use");
    }

    // Create a new user with a hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ email, password: hashedPassword });
    await user.save();

    // Store user id on the token payload
    const payload = {
      id: user.id,
    };

    const token = jwt.sign(
      payload,
      process.env.SESSION_SECRET || "bla-bla-bla"
    );

    return { user, token };
  }

  @Mutation(() => UserResponce)
  async login(
    @Arg("input") { email, password }: AuthInput
  ): Promise<UserResponce> {
    // Check for an existing email
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      throw new Error("Invalid login");
    }

    // Check if the passsword is valid
    const valid = await bcrypt.compare(password, existingUser.password);

    if (!valid) {
      throw new Error("Invalid login");
    }

    // Store user id on the token payload
    const payload = {
      id: existingUser.id,
    };

    const token = jwt.sign(
      payload,
      process.env.SESSION_SECRET || "bla-bla-bla"
    );

    return { user: existingUser, token };
  }
}
