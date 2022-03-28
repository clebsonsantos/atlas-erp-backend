import { Expenses } from '../../entities/Expenses';
import { TableCell } from 'pdfmake/interfaces';
import { Response } from 'express';
import { DefaultsConfigReport } from './DefaultsConfigReport';

export class ExpensesReports  {

  async execute( Expenses: Expenses[], response: Response){

    //CORPO DA TABELA
    const body = [ ];
    const columnsTitle: TableCell[] = [
      {text: "Data", style: "tableTitle"},
      {text: "Descrição", style: "tableTitle"},
      // {text: "Centro de custo", style: "tableTitle"},
      {text: "Categoria", style: "tableTitle"},
      {text: "Quant.", style: "tableTitle"},
      {text: "Valor", style: "tableTitle"},
      {text: "Subtotal", style: "tableTitle"},
    ]
    for await (const item of Expenses){
      const rows = new Array()
      rows.push(item.date.toLocaleDateString())
      rows.push(item.description)
      // rows.push(item.center_cost.name)
      rows.push(item.category.name)
      rows.push(item.quantity)
      rows.push(item.amount)
      rows.push(item.quantity * item.amount)

      body.push(rows)
    }
    const titleReport = "Relatório de Despesas"

    await (new DefaultsConfigReport()).execute({titleReport, columnsTitle, body, response, orientationPage: 'portrait'})
    
  }
}


