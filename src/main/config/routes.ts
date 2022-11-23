import { Express, Router } from 'express'
import { readdirSync } from "fs"
import { join } from "path"

export const setupRouters = (app: Express): void => {
  const router = Router()
  readdirSync(join(__dirname, "../routes"))
    .filter(file => !file.endsWith(".map"))
    .map(async file => {
      (await import(`../routes/${file}`)).default(router)
    })
  const version = "v1"
  app.use(`/api/${version}`, router)
}
