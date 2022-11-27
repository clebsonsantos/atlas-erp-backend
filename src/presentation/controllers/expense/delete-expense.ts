import { DeleteExpense } from "@/domain/contracts/usecases/expense" 
import { Controller } from "@/presentation/controllers/controller"
import { badRequest, HttpRequest, HttpResponse, ok } from "@/presentation/helpers"

export class DeleteExpenseController extends Controller {
  constructor(private readonly deleteExpenseService: DeleteExpense) {
    super()
  }

  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params
    const result = await this.deleteExpenseService.execute({ id })
    return result.isLeft()
      ? badRequest(result.value)
      : ok({
        message: result.value
      })
  }
}