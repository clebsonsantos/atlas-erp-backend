import { NextFunction, Request, Response } from "express";
import { decode, verify } from "jsonwebtoken";

export const ensuredAuthReports = () => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const { token } = request.query
    
    if (!token) {
      return response.status(401).json({ error: "Token is missing" });
    }
    const authToken = token.toString()
    
    try {
      verify(authToken, process.env.SECRET_JWT);

      const { sub } = decode(authToken);
      request.userId = sub.toString();

      return next();
    } catch (err) {
      return response.status(401).end();
    }
  };
};
