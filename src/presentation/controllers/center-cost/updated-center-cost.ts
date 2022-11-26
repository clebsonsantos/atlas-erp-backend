import { Controller } from "@/presentation/controllers/controller"
import { badRequest, HttpRequest, HttpResponse, ok } from "@/presentation/helpers"
import { UpdatedCenterCost } from "@/domain/contracts/usecases"

export class UpdateCenterCostController extends Controller {
  constructor(private readonly updateCenterCost: UpdatedCenterCost){
    super()
  }

  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { name } = httpRequest.body
    const { id } = httpRequest.params
    const result = await this.updateCenterCost.execute({ id, name })
    return result.isLeft()
      ? badRequest(result.value)
      : ok(result.value)
  }
}