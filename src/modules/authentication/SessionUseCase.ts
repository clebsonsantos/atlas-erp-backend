import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UserRepository } from "../../repositories";
import { User } from "../user/infra/typeorm/entities/user";

type UserRequest = {
  username: string;
  password: string;
};

export class SessionUseCase {
  async execute({ username, password }: UserRequest) {
    const repo = UserRepository();

    const user = await repo.findOne({ username }, {relations: ['permissions', 'roles']}) as unknown as User

    if (!user) {
      return new Error("Usuário não existe.");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return new Error("Usuário ou senha incorretos.");
    }

    const token = sign({}, "" + process.env.SECRET_JWT, {
      subject: user.id,
    });

    if(user.permissions.length == 0){
      return new Error(`Você não possui nenhuma permissão para acessar o Atlas.\n\nSolicite a um usuário com permissões administrativas para lhe atribuir permissões.`)
    }

    return { 
      token: token, 
      user_id: user.id,
      user_permissions: user.permissions, 
      // user_roles: user.roles
    };
  }
}
