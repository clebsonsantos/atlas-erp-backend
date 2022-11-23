import { ForbiddenError, ServerError, UnauthorazedError } from "@/presentation/errors"

export type HttpResponse<T = any> = {
  statusCode: number
  data: T
}

export type HttpRequest<T = any> = {
  body: any
  file: {
    path: string
  }
  headers: any
}

export const ok = <T = any> (data: T): HttpResponse<T> => ({
  statusCode: 200,
  data
})

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  data: error
})

export const unauthorized = (): HttpResponse<Error> => ({
  statusCode: 401,
  data: new UnauthorazedError()
})

export const serverError = (error: Error): HttpResponse<Error> => ({
  statusCode: 500,
  data: new ServerError(error)
})

export const forbidden = (): HttpResponse<Error> => ({
  statusCode: 403,
  data: new ForbiddenError()
})
