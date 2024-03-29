import { Role } from "../../entities/Role";
import { RoleRepository } from "../../repositories";

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
