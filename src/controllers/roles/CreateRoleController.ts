import { Request, Response } from "express";
import { CreateRoleUseCase } from "../../modules/roles/CreateRoleUseCase";

export class CreateRoleController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body;

    const createRoleService = new CreateRoleUseCase();

    const result = await createRoleService.execute({ name, description });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }
}
