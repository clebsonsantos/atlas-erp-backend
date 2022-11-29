import { CreateCustomer } from "@/domain/contracts/usecases"
import { Controller } from "@/presentation/controllers/controller"
import { badRequest, HttpRequest, HttpResponse, ok } from "@/presentation/helpers"

export class CreateCustomerController extends Controller {
  constructor(private readonly customerService: CreateCustomer){
    super()
  }
  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { ...data } = httpRequest.body
    const result = await this.customerService.execute(data)
    return result.isLeft()
      ? badRequest(result.value)
      : ok(result.value)
  }
}