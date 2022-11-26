import { LoadAdministrator } from "@/domain/contracts/usecases"
import { Controller } from "@/presentation/controllers/controller"
import { HttpRequest, HttpResponse, ok } from "@/presentation/helpers"

export class LoadAdministratorCompanyController extends Controller {

  constructor(private readonly administratorInfo: LoadAdministrator){
    super()
  }
  override async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const administrator = await this.administratorInfo.execute()
    return ok(administrator)
  }
}
