import { Either } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { Response } from "express"
import { PageOrientation, Size, TDocumentDefinitions } from "pdfmake/interfaces"

export namespace DefaultConfigReport {
  export type Params = {
    titleReport?: string
    columnsTitle?: any
    body?: any
    response?: Response
    orientationPage: PageOrientation
    widthsColumns?: Size[]
    CategoryTitleGroup?: boolean
    totalExpenses?: number
  }
  export type Result = Either<AppError, TDocumentDefinitions>
}