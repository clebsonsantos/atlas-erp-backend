import { CreateExpense } from "@/domain/contracts/usecases/expense" 
import { Controller } from "@/presentation/controllers/controller"
import { badRequest, HttpRequest, HttpResponse, ok } from "@/presentation/helpers"

export class CreateExpensesController extends Controller{
  constructor(private readonly createExpenseService: CreateExpense) {
    super()
  }

  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const data = httpRequest.body 
    const result = await this.createExpenseService.execute({ ...data }) 
    return result.isLeft()
      ? badRequest(result.value)
      : ok(result.value)
  }
}