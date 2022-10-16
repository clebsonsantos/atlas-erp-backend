import {
  PageOrientation,
  Size,
  TDocumentDefinitions,
} from "pdfmake/interfaces"

import { AdministratorRepository } from "../../repositories"
import { Response } from "express"
import defaultLayout from "./layouts/defaultLayout"
import groupedLayout from "./layouts/groupedLayout"
import { Administrator } from "../administrator/infra/typeorm/entities/adminitrator"
import { SendReportPdfToClientSide } from "./adapters/send-report-pdf-to-client-side"
import { getLogoImage } from "./utils/get-logo-image"

type Type = {
  titleReport?: string
  columnsTitle?: any
  body?: any
  response: Response
  orientationPage: PageOrientation
  widthsColumns?: Size[]
  CategoryTitleGroup?: boolean
  totalExpenses?: number
}

export class DefaultsConfigReport {
  async execute({
    titleReport,
    columnsTitle,
    body,
    response,
    orientationPage,
    widthsColumns,
    CategoryTitleGroup,
    totalExpenses,
  }: Type) {
    //BUSCANDO INFORMAÇÕES DO PROVEDOR
    const findCompany: Administrator[] = await AdministratorRepository().find()
    const company = findCompany[0]

    const docDefinitions: TDocumentDefinitions = CategoryTitleGroup
      ? groupedLayout({
          titleReport,
          contentTable: body,
          orientationPage,
          company,
          LogoImage: getLogoImage,
          totalExpenses,
        })
      : defaultLayout({
          titleReport,
          columnsTitle,
          body,
          orientationPage,
          widthsColumns,
          company,
          LogoImage: getLogoImage,
        })

    await new SendReportPdfToClientSide().execute({ response, docDefinitions })
  }
}
