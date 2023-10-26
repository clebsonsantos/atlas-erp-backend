import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import { routes } from "./routes";
import cors from 'cors';
import * as dotenv from 'dotenv'

dotenv.config({ path: `${__dirname}/../../.env`});

import "./database";
import "./utils/on-backups"
import { AppError } from "./shared/errors/AppError";
const app = express();
import YAML from "yaml";
import swaggerUi from 'swagger-ui-express';
import * as fs from "fs"
import * as path from "path"

import "./main/config/module-alias";

const pathFile = path.resolve("./open-api.yaml")
const file = fs.readFileSync(pathFile, "utf8");
const swaggerDocument = YAML.parse(file)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors())
app.use('/uploads', express.static('uploads'))

app.options('*', cors());

app.use(express.json());

const appVersion = "/v1"
app.use(appVersion, routes);

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

const PORT = process.env.PORT || 4000
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
