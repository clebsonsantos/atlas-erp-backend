import { setupRouters } from '@/main/config/routes'
import { setupMidlewares } from '@/main/config/middlewares'
import express, { NextFunction, Request, Response } from "express"

const app = express()
setupMidlewares(app)
setupRouters(app)

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    }) 
  }
) 

export { app }
