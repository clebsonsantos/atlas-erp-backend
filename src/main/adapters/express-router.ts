import { Controller } from "@/presentation/controllers/controller"
import { RequestHandler } from "express"

type Adapter = (controller: Controller) => RequestHandler

export const adaptExpressRoute: Adapter = controller => async (request, response) => {
  const { statusCode, data } = await controller.handle({ ...request })
  const json = [200, 204].includes(statusCode) ? data : { error: data.message }
  response.status(statusCode).json(json)
}
