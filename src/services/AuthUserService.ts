import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IAuthUserRequest {
  email: string,
  password: string
}

class AuthUserService {
  async execute({ password, email }: IAuthUserRequest){
    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOne({
      email,
    });

    if(!user) {
      throw new Error("Email e/ou Password is incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch) {
      throw new Error("Email e/ou Password is incorrect");
    }

      const token = sign({ email: user.email }, "49tr5wq7rt9wr0er2g4s56d8", {
        subject: user.id,
        expiresIn: "15m"
      }
    );

    return token;
  }
}

export { AuthUserService };