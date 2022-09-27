import "reflect-metadata";
import * as dotenv from 'dotenv'
import express, { NextFunction, Request, Response } from "express";
import cors from 'cors';

dotenv.config({ path: `${__dirname}/../../.env`});
import "@/shared/infra/typeorm";
import "@/utils/on-backups"
import "@/main/config/module-alias"
import { routes } from "./routes";
import { AppError } from "@/shared/errors/AppError";

const app = express();

app.use(cors())
app.use('/uploads', express.static('uploads'))
app.options('*', cors());
app.use(express.json());
app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
  );

  export { app }