import { ListExpenses } from "@/domain/contracts/usecases/expense" 
import { Controller } from "@/presentation/controllers/controller"
import { HttpResponse, ok } from "@/presentation/helpers"

export class ListExpensesController extends Controller {
  constructor(private readonly listExpensesService: ListExpenses) {
    super()
  }
  async perform(httpRequest: any): Promise<HttpResponse> {
    const result = await this.listExpensesService.execute()
    return ok(result)
  }
}