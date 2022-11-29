import { DeleteCustomer } from "@/domain/contracts/usecases"
import { Controller } from "@/presentation/controllers/controller"
import { badRequest, HttpRequest, HttpResponse, ok } from "@/presentation/helpers"

export class DeleteCustomerController extends Controller {
  constructor(private readonly deleteCustomer: DeleteCustomer) {
    super()
  }

  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params
    const result = await this.deleteCustomer.execute({ id })
    return result.isLeft()
      ? badRequest(result.value)
      : ok(result.value)
  }
}