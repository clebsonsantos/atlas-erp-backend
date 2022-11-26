import { Express, json, NextFunction, Request, Response, urlencoded } from "express"
import cors from "cors"

export const setupMidlewares = (app: Express): void => {
  app.use(cors())
  app.use(urlencoded({ extended: true }))
  app.use(json())
  // app.use((req, res, next) => {
  //   res.type("json")
  //   next()
  // })
  app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
      return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`,
      }) 
    }
  ) 
}
