import { setupRouters } from '@/main/config/routes'
import { setupMidlewares } from '@/main/config/middlewares'
import express from "express"

const app = express()
setupMidlewares(app)
setupRouters(app)
export { app }
