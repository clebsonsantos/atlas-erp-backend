import { container } from 'tsyringe';
import { Request, Response } from "express";
import { CreateUserAccessControlListUseCase } from "../../modules/user/CreateUserAccessControlListUseCase";

export class CreateUserAccessControlListController {
  async handle(request: Request, response: Response) {
    const { permissions, roles } = request.body;
    const { userId } = request.params;

    const createUserACLService = container.resolve(CreateUserAccessControlListUseCase)

    const result = await createUserACLService.execute({
      userId,
      permissions,
      roles,
    });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }
}
