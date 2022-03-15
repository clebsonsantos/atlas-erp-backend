import { Request, Response } from "express";
import { FindOneUserUseCase } from '../../usecases/user/FindOneUserUseCase';

export class FindOneUserController {
  async handle(request: Request, response: Response) {

    const { username } = request.body
    const findOne = new FindOneUserUseCase();

    const users = await findOne.execute(username);

    return response.json(users);
  }
}
