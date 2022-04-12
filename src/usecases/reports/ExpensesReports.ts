import { Expenses } from '../../entities/Expenses';
import { Column, TableCell } from 'pdfmake/interfaces';
import { Response } from 'express';
import { DefaultsConfigReport } from './DefaultsConfigReport';
import { CategoryRepository } from '../../repositories';
import formatCurrency from '../../utils/formatCurrency';

export class ExpensesReports  {

  async execute( Expenses: Expenses[], centerName: string | string[] | any, time_course:string, response: Response){

    const categories = await CategoryRepository().find({order: {name: "ASC"}})
    const ExpensesFilter = centerName ? Expenses.filter(fill=> fill.center_cost_id == centerName) : Expenses
    let center: string = centerName ? ExpensesFilter[0].center_cost.name : ""
    
    const titleReport = `Relatório de Despesas\n\n${center}\n\n${time_course}`
    const ContentLayout = []
    for await(const categorie of categories){
      const expensesFiltered = ExpensesFilter.filter(expense => expense.category_id == categorie.id)
      const category = this.handleCategoryName(categorie.name)
      const Body = await this.handleBodyContent(expensesFiltered)
      const tableContent = this.handleContextTable(Body)

      if(expensesFiltered.length > 0){
        ContentLayout.push(category)
        ContentLayout.push(tableContent)
      }
    }
    let totalExpenses = ExpensesFilter.reduce((total, current)=> Number(total) + (Number(current.quantity) * Number(current.amount)), 0)

    await (new DefaultsConfigReport()).execute({titleReport, body: ContentLayout, response, orientationPage: 'portrait', CategoryTitleGroup: true, totalExpenses})
    
  }
  handleCategoryName = (category:string): Column[] =>{
    return [{
            text: category.toUpperCase() , 
            alignment:'left', 
            bold: true, 
            fontSize: 13, 
            color: '#433d52', 
            margin: [0, 10, 0, 10]
          }]
  }
  handleContextTable = (body:any[]) => {  
    return {
          layout: 'lightHorizontalLines', 
          margin: [-15, 0, 0, 0],
          fontSize: 11.5,
          table: {
            headerRows: 1,
            widths: [70, 200, 48, 80, 80],
            heights: function (){
              return 15;
            },
            body: [
              ...body
            ]
          }
        }
  }
  async handleBodyContent(Expenses: Expenses[]){
    //CORPO DA TABELA
    const body = [ ];
    const columnsTitle: TableCell[] = [
      {text: "Data", style: "tableTitle"},
      {text: "Descrição", style: "tableTitle"},
      {text: "Quant.", style: "tableTitle"},
      {text: "Valor", style: "tableTitle"},
      {text: "Subtotal", style: "tableTitle"},
    ]

    body.push(columnsTitle)

    for await (const item of Expenses){
      const rows = new Array()
      rows.push(item.date.toLocaleDateString())
      rows.push(item.description)
      rows.push(item.quantity)
      rows.push(formatCurrency(Number(item.amount)))
      rows.push(formatCurrency(item.quantity * item.amount))

      body.push(rows)
    }
    return body
  }
}


