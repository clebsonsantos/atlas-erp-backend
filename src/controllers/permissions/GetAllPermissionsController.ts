import { GetAllPermissionsUseCase } from './../../usecases/permissions/GetAllPermissionsUseCase';

import { Request, Response } from "express";

export class GetAllPermissionsController {

  async handle(request: Request, response: Response) {
    const getAllPermissions = new GetAllPermissionsUseCase();

    const permissions = await getAllPermissions.execute();

    return response.json(permissions);
  }
}