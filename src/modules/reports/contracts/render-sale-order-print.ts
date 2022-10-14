import { Either } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { TDocumentDefinitions } from "pdfmake/interfaces"

export namespace RenderSaleOrderPrint {
  export type Params =  {
    id: string
  }
  export type Result = Either<AppError, TDocumentDefinitions>
}