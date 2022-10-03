import { RoleRepository } from "../../repositories";
import { Role } from "./infra/typeorm/entities/role";

type RoleRequest = {
  name: string;
  description: string;
};

export class CreateRoleUseCase {
  async execute({ name, description }: RoleRequest): Promise<Role | Error> {
    const repo = RoleRepository();

    if (await repo.findOne({ name })) {
      return new Error("Função/cargo já existe!");
    }

    const role = repo.create({ name, description });

    await repo.save(role);

    return role;
  }
}
