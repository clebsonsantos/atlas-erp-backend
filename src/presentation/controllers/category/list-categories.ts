import { LoadCategories } from "@/domain/contracts/usecases"
import { Controller } from "@/presentation/controllers/controller"
import { HttpRequest, HttpResponse, ok } from "@/presentation/helpers"

export class GetAllCategoryController extends Controller {
  constructor(private readonly listCategoriesService: LoadCategories) {
    super()
  }

  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const categories = await this.listCategoriesService.execute()
    return ok(categories)
  }
}