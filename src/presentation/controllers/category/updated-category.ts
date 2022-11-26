import { UpdatedCategory } from "@/domain/contracts/usecases"
import { Controller } from "@/presentation/controllers/controller"
import { badRequest, HttpRequest, HttpResponse, ok } from "@/presentation/helpers"

export class UpdateCategoryController extends Controller {
  constructor(private readonly updateCategoryService: UpdatedCategory) {
    super()
  }

  async perform(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const { id } = httpRequest.params
    const { name} = httpRequest.body
    const result = await this.updateCategoryService.execute({ id, name })
    return result.isLeft()
      ? badRequest(result.value)
      : ok(result.value)
  }
}