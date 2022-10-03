import { PermissionRepository } from "@/repositories"
import { left, right } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { CreatePermission } from "./contracts/create-permission"

export class CreatePermissionUseCase {
  async execute({
    name,
    description,
  }: CreatePermission.Params): Promise<CreatePermission.Result> {
    const repo = PermissionRepository()

    if (await repo.findOne({ name })) {
      return left(new AppError("Permissão já existe!"))
    }

    const permission = repo.create({ name, description })

    await repo.save(permission)

    return right(permission)
  }
}
