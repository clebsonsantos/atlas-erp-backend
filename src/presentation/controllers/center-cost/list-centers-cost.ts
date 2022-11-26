import { Controller } from "@/presentation/controllers/controller"
import { HttpResponse, ok } from "@/presentation/helpers"
import { LoadCenterCost } from "@/domain/contracts/usecases"

export class GetAllCenterCostController extends Controller {
  constructor(private readonly listCentersCostService: LoadCenterCost) {
    super()
  }

  async perform(httpRequest: any): Promise<HttpResponse> {
    const centerCosts = await this.listCentersCostService.execute()
    return ok(centerCosts)
  }
}