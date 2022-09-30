import { container } from 'tsyringe';
import { Request, Response } from "express";
import { FindUserByUsernameUseCase } from "../usecases/find-user-by-username";

export class FindUserByUsernameController {
  async handle(request: Request, response: Response) {

    const { username } = request.body
    const findOne = container.resolve(FindUserByUsernameUseCase)

    const users = await findOne.execute(username);

    return response.json(users);
  }
}
