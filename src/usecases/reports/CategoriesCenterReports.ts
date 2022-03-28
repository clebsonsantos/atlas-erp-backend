import { Category } from '../../entities/Category';
import { CentersCost } from '../../entities/CentersCost';
import { TableCell } from 'pdfmake/interfaces';
import { Response } from 'express';
import { DefaultsConfigReport } from './DefaultsConfigReport';

export class CategoriesCenterReports  {

  async execute( Component: Category[] | CentersCost[], response: Response){

    //CORPO DA TABELA
    const body = [ ];
    const columnsTitle: TableCell[] = [
      {text: "Descrição", style: "tableTitle"},
      {text: "Data de criação", style: "tableTitle"}
    ]
    for await (const item of Component){
      const rows = new Array()
      rows.push(item.name)
      rows.push(item.created_at.toLocaleDateString())

      body.push(rows)
    }
    const titleReport = Component[0] instanceof Category ? 'Categorias registradas' : "Centros de Custo registrados"

    await (new DefaultsConfigReport()).execute({titleReport, columnsTitle, body, response, orientationPage: 'portrait', widthsColumns: ["*", "auto"]})
  }
}

