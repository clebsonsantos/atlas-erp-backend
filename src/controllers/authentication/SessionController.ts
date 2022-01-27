import { Request, Response } from "express";
import { SessionUseCase } from "../../usecases/authentication/SessionUseCase";

export class SessionController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const sessionUseCase = new SessionUseCase();
    const result = await sessionUseCase.execute({ username, password });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }
    return response.json(result);
  }
}
