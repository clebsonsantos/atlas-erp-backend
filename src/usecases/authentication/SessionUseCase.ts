import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UserRepository } from "../../repositories";

type UserRequest = {
  username: string;
  password: string;
};

export class SessionUseCase {
  async execute({ username, password }: UserRequest) {
    const repo = UserRepository();

    const user = await repo.findOne({ username }, {relations: ['permissions', 'roles']});

    if (!user) {
      return new Error("Usuário não existe.");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return new Error("Usuário ou senha incorretos.");
    }

    const token = sign({}, process.env.SECRET_JWT, {
      subject: user.id,
    });

    return { 
      token: token, 
      user_id: user.id,
      user_permissions: user.permissions, 
      user_roles: user.roles
    };
  }
}
