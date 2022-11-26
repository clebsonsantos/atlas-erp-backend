import { Controller } from "@/presentation/controllers/controller"
import { badRequest, HttpRequest, HttpResponse, ok } from "@/presentation/helpers"
import { DeleteCenterCost } from "@/domain/contracts/usecases"

export class DeleteCenterCostController extends Controller {
  constructor(private readonly deleteCenterCost: DeleteCenterCost){
    super()
  }

  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params
    const result = await this.deleteCenterCost.execute({ id })
    return result.isLeft()
      ? badRequest(result.value)
      : ok({
        message: result.value
      })
  }
}