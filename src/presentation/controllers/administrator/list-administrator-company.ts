import { LoadAdministrator } from "@/domain/contracts/usecases/administrator/load-administrator"
import { Controller } from "@/presentation/controllers/controller"
import { HttpRequest, HttpResponse, ok } from "@/presentation/helpers"

export class ListAdministratorCompanyController  extends Controller {

  constructor(private readonly administratorInfo: LoadAdministrator){
    super()
  }
  async perform(httpRequest: HttpRequest): Promise<HttpResponse> {
    const administrator = await this.administratorInfo.execute()
    return ok(administrator)
  }
}
