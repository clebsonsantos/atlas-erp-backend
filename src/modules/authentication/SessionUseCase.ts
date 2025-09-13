import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UserRepository } from "../../repositories";
import { logger } from "@/utils/logger";

type UserRequest = {
  username: string;
  password: string;
};

export class SessionUseCase {
  async execute({ username, password }: UserRequest) {
    logger.info(`Iniciando sessão para o usuário ${username}`);
    const repo = UserRepository();

    const user = await repo.findOne(
      { username },
      { relations: ["permissions", "roles"] }
    );

    if (!user) {
      logger.warn(`Usuário ${username} não existe.`);
      return new Error("Usuário não existe.");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      logger.warn(`Tentativa de login falhou para o usuário ${username}`);
      return new Error("Usuário ou senha incorretos.");
    }

    const token = sign({}, "" + process.env.SECRET_JWT, {
      subject: user.id,
    });

    if (user.permissions.length == 0) {
      const message = `Usuário ${user.username} não possui nenhuma permissão atribuída.`;
      logger.warn(message);
      return new Error(message);
    }

    logger.info(`Usuário ${username} autenticado com sucesso.`);
    return {
      token: token,
      user_id: user.id,
      user_permissions: user.permissions,
      // user_roles: user.roles
    };
  }
}
