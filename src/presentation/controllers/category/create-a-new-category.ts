import {  CreateCategory } from "@/domain/contracts/usecases"
import { Controller } from "@/presentation/controllers/controller"
import { badRequest, HttpRequest, HttpResponse, ok } from "@/presentation/helpers"

export class CreateANewCategoryController extends Controller {
  constructor(private readonly createCategoryService: CreateCategory){
    super()
  }
  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { name } = httpRequest.body
    const result = await this.createCategoryService.execute({ name })
    return result.isLeft()
    ? badRequest(result.value)
    : ok(result.value)
  }
}