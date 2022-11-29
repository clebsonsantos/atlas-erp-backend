import { FindAllCustomerOrFilter } from "@/domain/contracts/usecases"
import { Controller } from "@/presentation/controllers/controller"
import { HttpRequest, HttpResponse, ok } from "@/presentation/helpers"

export class FindAllOrFilterCustomersController extends Controller {
  constructor(private readonly getAllCustomer: FindAllCustomerOrFilter) {
    super()
  }
  
  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id, full_name } = httpRequest.body
    const result = await this.getAllCustomer.execute({ id, full_name })
    return ok(result)
  }
}