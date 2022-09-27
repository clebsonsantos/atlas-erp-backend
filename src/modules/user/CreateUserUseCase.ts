import { hash } from "bcryptjs";
import { User } from "../../entities/User";
import { UserRepository } from "../../repositories";

type UserRequest = {
  username: string;
  password: string;
  full_name: string;
  email: string;
  phone: string
};

export class CreateUserUseCase {
  async execute({ password, username, full_name, email, phone}: UserRequest): Promise<Error | User> {
    const existUser = await UserRepository().findOne({ username });

    if (existUser) {
      return new Error("Usuário já existe!");
    }

    const passwordHash = await hash(password, 8);

    const user = UserRepository().create({ username, password: passwordHash, full_name, email, phone });

    await UserRepository().save(user);

    return user;
  }
}
