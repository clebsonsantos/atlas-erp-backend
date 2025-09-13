import { hash } from "bcryptjs";
import { User } from "../../entities/User";
import { UserRepository } from "../../repositories";
import { logger } from "@/utils/logger";

type UserRequest = {
  username: string;
  password: string;
  full_name: string;
  email: string;
  phone: string;
};

export class CreateUserUseCase {
  async execute({
    password,
    username,
    full_name,
    email,
    phone,
  }: UserRequest): Promise<Error | User> {
    logger.info(`Criando novo usuário: ${username}`);
    const existUser = await UserRepository().findOne({ username });

    if (existUser) {
      logger.warn("Usuário já existe!");
      return new Error("Usuário já existe!");
    }

    const passwordHash = await hash(password, 8);

    const user = UserRepository().create({
      username,
      password: passwordHash,
      full_name,
      email,
      phone,
    });

    await UserRepository().save(user);
    logger.info(`Usuário ${username} criado com sucesso.`);
    return user;
  }
}
