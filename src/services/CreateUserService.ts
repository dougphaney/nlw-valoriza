import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IUserRequest {
  name: string,
  password: string,
  email: string,
  admin?: boolean
}

class CreateUserService {
  async execute({ name, password, email, admin = false }: IUserRequest){
    const usersRepository = getCustomRepository(UsersRepositories);

    if(!email) {
      throw new Error("Email incorrect");
    }

    const userAlreadyExists = await usersRepository.findOne({
      email,
    });

    if(userAlreadyExists) {
      throw new Error("User already exists");
    }

    const passwordHash = await hash(password, 8)

    const user = usersRepository.create({
      name,
      email,
      password: passwordHash,
      admin
    });

    await usersRepository.save(user);
    
    return user;
  }
}

export { CreateUserService };