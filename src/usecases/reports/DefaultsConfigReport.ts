import PdfPrinter from 'pdfmake'
import { PageOrientation, Size, TDocumentDefinitions } from 'pdfmake/interfaces'
import { Administrator } from '../../entities/Administrator'
import { AdministratorRepository } from '../../repositories'
import LogoImage from './LogoImage'
import { Response } from 'express';
import defaultLayout from './layouts/defaultLayout'
import groupedLayout from './layouts/groupedLayout'
import { ResponseReportClient } from './ResponseReportClient'

type Type = {
  titleReport?: string;
  columnsTitle?: any;
  body?: any;
  response: Response;
  orientationPage: PageOrientation;
  widthsColumns?: Size[];
  CategoryTitleGroup?:boolean
}


export class DefaultsConfigReport  {

  async execute({ titleReport, columnsTitle, body, response, orientationPage, widthsColumns, CategoryTitleGroup }: Type){

    //BUSCANDO INFORMAÇÕES DO PROVEDOR
    const findCompany:Administrator[] = await AdministratorRepository().find()
    const company = findCompany[0]
    
    const docDefinitions: TDocumentDefinitions = CategoryTitleGroup ? groupedLayout({titleReport, contentTable: body, orientationPage, company, LogoImage }) : defaultLayout({titleReport, columnsTitle, body, orientationPage, widthsColumns, company, LogoImage })

    await (new ResponseReportClient()).execute({response, docDefinitions})

  }
}
