import { Request, Response } from "express";
import { CreateRolePermissionUseCase } from "../../modules/roles/CreateRolePermissionUseCase";

export class CreateRolePermissionController {
  async handle(request: Request, response: Response) {
    const { roleId } = request.params;
    const { permissions } = request.body;

    const createRolePermissionService = new CreateRolePermissionUseCase();

    const result = await createRolePermissionService.execute({
      roleId,
      permissions,
    });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }
}
