import { UuidValidate } from "@/shared/infra/uuid/uuid-validate";
import { NextFunction, Request, Response } from "express";

export const ensuredValidateUUID = () => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const id = request.body.id ?? request.params.id

    const isValid = new UuidValidate()


    const value = isValid.validateUuid(id)
    if (value) {
      return next();
    }
    return response.status(500).json({ error: "Invalid uuid" });
  };
};
