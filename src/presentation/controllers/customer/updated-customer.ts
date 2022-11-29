import { UpdateCustomer } from "@/domain/contracts/usecases"
import { Controller } from "@/presentation/controllers/controller"
import { badRequest, HttpRequest, HttpResponse, ok } from "@/presentation/helpers"

export class UpdateCustomerController extends Controller {
  constructor(private readonly updateCustomer: UpdateCustomer) {
    super()
  }
  
  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { ...data } = httpRequest.body
    const { id } = httpRequest.params
    const result = await this.updateCustomer.execute({ id, ...data })
    return result.isLeft()
    ? badRequest(result.value)
    : ok(result.value)
  }
}