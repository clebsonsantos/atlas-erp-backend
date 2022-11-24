import { setupRouters } from '@/main/config/routes'
import { setupMidlewares } from '@/main/config/middlewares'
import express, { NextFunction, Request, Response } from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.options('*', cors()) 
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    }) 
  }
) 
setupMidlewares(app)
setupRouters(app)

export { app }
