import "reflect-metadata" 
import "../../../main/config/module-alias"
// import "@/utils/on-backups"

import * as dotenv from 'dotenv'
import express, { NextFunction, Request, Response } from "express" 
import cors from 'cors' 

dotenv.config({ path: `${__dirname}/../../.env`}) 
import { routes } from "./routes" 
import { AppError } from "@/shared/errors/AppError" 
import { startContainer } from "@/shared/container" 

const app = express() 
const versionApp = "v1"
import "@/shared/infra/typeorm" 
startContainer()


app.use(cors())
app.use(`/${versionApp}/uploads`, express.static('uploads'))
app.options('*', cors()) 
app.use(express.json()) 
app.use(`/${versionApp}`, routes) 

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      }) 
    }
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    }) 
  }
  ) 

export { app }