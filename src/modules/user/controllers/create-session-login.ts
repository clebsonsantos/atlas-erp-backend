import { Request, Response } from "express";
import { container } from "tsyringe";
import { LoginToUserWithPermissions } from "../usecases/login-to-user-with-permissions";

export class CreateSessionLoginController {
  
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const loginToUserWithPermission = container.resolve(LoginToUserWithPermissions)
    const result = await loginToUserWithPermission.execute({ username, password });

    if (result.isLeft()) {
      return response.status(result.value.statusCode).json(result.value.message);
    }
    return response.json(result.value);
  }
}
