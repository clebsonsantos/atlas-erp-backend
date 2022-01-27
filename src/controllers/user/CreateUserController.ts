import { Request, Response } from "express";
import { CreateUserUseCase } from "../../usecases/user/CreateUserUseCase";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const createUserService = new CreateUserUseCase();
    const result = await createUserService.execute({ username, password });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }
}
