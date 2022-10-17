import {
  PageOrientation,
  Size,
  TDocumentDefinitions,
} from "pdfmake/interfaces"

import { Response } from "express"
import { getLogoImage } from "../utils/get-logo-image"
import groupedLayout from "../layouts/groupedLayout"
import defaultLayout from "../layouts/defaultLayout"
import { inject } from "tsyringe"
import { AdministratorRepository } from "@/modules/administrator/repositories/administrator-repository"
import { Either, left, right } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { DefaultConfigReport } from "../contracts/defaults-config-reports"


export class SendReportByLayoutDefaults {
  constructor(
  @inject("AdministratorRepository")
  private readonly administratorRepository: AdministratorRepository
  ){}

  async execute({
    titleReport,
    columnsTitle,
    body,
    response,
    orientationPage,
    widthsColumns,
    CategoryTitleGroup,
    totalExpenses,
  }: DefaultConfigReport.Params): Promise<DefaultConfigReport.Result> {
    
    const findCompany = await this.administratorRepository.list()
    
    if (!findCompany.length) {
      return left(new AppError("Registre uma compania antes de gerar relatórios"))
    }
    
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

    return right(docDefinitions)
  }
}
