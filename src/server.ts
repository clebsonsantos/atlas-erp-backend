import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import { routes } from "./routes";
import cors from 'cors';
import * as dotenv from 'dotenv'
dotenv.config({ path: `${__dirname}/../../.env`});
const PORT = process.env.PORT || 4000
import "./database";
import "./utils/on-backups"
import { AppError } from "./shared/errors/AppError";
const app = express();
import "./main/config/module-alias"

app.use(cors())
app.use('/uploads', express.static('uploads'))

app.options('*', cors());

app.use(express.json());

app.use(routes);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

app.listen(PORT, () => {
  const running = {
    author: "Clebson Santos",
    system: "Altas - softmanager api",
    node_version: 16,
    port: PORT,
    message: 'Server is running'
  }
  console.table([running])
});
