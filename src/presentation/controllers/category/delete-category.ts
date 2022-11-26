import { DeleteCategory } from "@/domain/contracts/usecases"
import { Controller } from "@/presentation/controllers/controller"
import { badRequest, HttpRequest, HttpResponse, ok } from "@/presentation/helpers"

export class DeleteCategoryController extends Controller {
  constructor(private readonly deleteCategoryService: DeleteCategory){
    super()
  }

  override async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params
    const result = await this.deleteCategoryService.execute({id})
    return result.isLeft()
      ? badRequest(result.value)
      : ok({
        message: result.value
      })
  }
}