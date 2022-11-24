import { HttpRequest, HttpResponse, serverError } from "@/presentation/helpers"

export abstract class Controller {
  abstract perform (httpRequest: HttpRequest): Promise<HttpResponse>

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      return await this.perform(httpRequest)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
