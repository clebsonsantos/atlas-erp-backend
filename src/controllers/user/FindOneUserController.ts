import { container } from 'tsyringe';
import { Request, Response } from "express";
import { FindOneUserUseCase } from '../../modules/user/FindOneUserUseCase';

export class FindOneUserController {
  async handle(request: Request, response: Response) {

    const { username } = request.body
    const findOne = container.resolve(FindOneUserUseCase)

    const users = await findOne.execute(username);

    return response.json(users);
  }
}
