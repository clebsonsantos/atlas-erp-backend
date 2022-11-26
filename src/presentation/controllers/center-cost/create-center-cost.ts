import { Controller } from "@/presentation/controllers/controller"
import { badRequest, HttpRequest, HttpResponse, ok } from "@/presentation/helpers"
import { CreateCenterCost } from "@/domain/contracts/usecases"

export class CreateCenterCostController extends Controller {
  constructor(private readonly createCenterCost: CreateCenterCost){
    super()
  }

  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { name } = httpRequest.body
    const result = await this.createCenterCost.execute({name})
    return result.isLeft()
    ? badRequest(result.value)
    : ok(result.value)
  }
}




