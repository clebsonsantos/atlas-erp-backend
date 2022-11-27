import { UpdatedExpense } from "@/domain/contracts/usecases/expense" 
import { Controller } from "@/presentation/controllers/controller"
import { badRequest, HttpRequest, HttpResponse, ok } from "@/presentation/helpers"

export class UpdateExpensesController extends Controller {
  constructor(private readonly updatedExpenseService: UpdatedExpense) {
    super()
  }

  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const data = httpRequest.body
    const { id } = httpRequest.params
    const result = await this.updatedExpenseService.execute({ 
      id,
      ...data
    })
    return result.isLeft()
      ? badRequest(result.value)
      : ok(result.value)
  }
}