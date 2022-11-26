import { Either, left, right } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { inject, injectable } from "tsyringe"
import { CreateRole } from "../contracts/create-role"
import { IRoleRepository } from "../repositories/irole-repository"

@injectable()
export class CreateRoleUseCase {
  constructor(
  @inject("RoleRepository")
  private readonly roleRepository: IRoleRepository
  ){}
  async execute({ name, description }: CreateRole.Input): Promise<CreateRole.Output> {
    const validate = this.validate(name, description)
    if (validate.isLeft()) {
      return left(new AppError(validate.value))
    }

    const role = await this.roleRepository.findByName(name)
    if (role) {
      return left(new AppError("Função/cargo já existe!"))
    }

    const roleSave = await this.roleRepository.add({ name, description })

    return right(roleSave)
  }

  validate(name: string, description: string): Either<string, null> {
    const messageError = `Input is required: `
    if (!name) {
      return left(messageError.concat("name"))
    }
    if (!description) {
      return left(messageError.concat("description"))
    }
    return right(null)
  }
}
