import {
  PageOrientation,
  Size,
  TDocumentDefinitions,
} from "pdfmake/interfaces";
import { Administrator } from "../../infrastructure/persistence/entities/Administrator";
import { AdministratorRepository } from "../../repositories";
import logoImage from "./LogoImage";
import { Response } from "express";
import defaultLayout from "./layouts/defaultLayout";
import groupedLayout from "./layouts/groupedLayout";
import { ResponseReportClient } from "./ResponseReportClient";

type Type = {
  titleReport?: string;
  columnsTitle?: any;
  body?: any;
  response: Response;
  orientationPage: PageOrientation;
  widthsColumns?: Size[];
  CategoryTitleGroup?: boolean;
  totalExpenses?: number;
};

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
    const findCompany: Administrator[] = await AdministratorRepository().find();
    const company = findCompany[0];

    const docDefinitions: TDocumentDefinitions = CategoryTitleGroup
      ? groupedLayout({
          titleReport,
          contentTable: body,
          orientationPage,
          company,
          LogoImage: logoImage,
          totalExpenses,
        })
      : defaultLayout({
          titleReport,
          columnsTitle,
          body,
          orientationPage,
          widthsColumns,
          company,
          LogoImage: logoImage,
        });

    await new ResponseReportClient().execute({ response, docDefinitions });
  }
}
