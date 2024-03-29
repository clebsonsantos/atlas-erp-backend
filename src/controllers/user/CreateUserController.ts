import { Request, Response } from "express";
import { CreateUserUseCase } from "../../modules/user/CreateUserUseCase";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { username, password, full_name, email, phone} = request.body;

    const createUserService = new CreateUserUseCase();
    const result = await createUserService.execute({ username, password, full_name, email, phone});

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }
}
