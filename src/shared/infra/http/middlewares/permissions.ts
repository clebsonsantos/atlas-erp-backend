import { UserRepository } from "@/modules/user/infra/typeorm/repositories/user-repository"
import { NextFunction, Request, Response } from "express" 

export function can(permissionsRoutes: string[]) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const userRepository = new UserRepository()
    const { userId } = request 
    const user = await userRepository.findById(userId)

    if (!user) {
      return response.status(400).json("User does not exists") 
    }

    const permissionExists = user.permissions
      .map((permission) => permission.name)
      .some((permission) => permissionsRoutes.includes(permission)) 

    if (!permissionExists) {
      return response.status(401).json('Você não possui permissões para acessar esse serviço.').end() 
    }

    return next() 
  } 
}

export function is(rolesRoutes: string[]) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const { userId } = request 
    const userRepository = new UserRepository()
    const user = await userRepository.findById(userId) 

    if (!user) {
      return response.status(400).json("Usuário não existe.") 
    }

    const roleExists = user.roles
      .map((role) => role.name)
      .some((role) => rolesRoutes.includes(role)) 

    if (!roleExists) {
      return response.status(401).json("Você precisa de permissões administrativas.").end()
    }

    return next() 
  } 
}
