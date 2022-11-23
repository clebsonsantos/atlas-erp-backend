import { HttpResponse } from "@/presentation/helpers"

export interface Middleware {
  handle: (httpRequest: any) => Promise<HttpResponse>
}
