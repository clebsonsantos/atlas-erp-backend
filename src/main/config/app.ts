import { setupMidlewares } from '@/main/config/middlewares'
import { setupRouters } from '@/main/config/routes'
import express from "express"

const app = express()
setupMidlewares(app)
setupRouters(app)
export { app }
