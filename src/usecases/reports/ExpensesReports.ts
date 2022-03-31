import { Expenses } from '../../entities/Expenses';
import { Column, Size, TableCell } from 'pdfmake/interfaces';
import { Response } from 'express';
import { DefaultsConfigReport } from './DefaultsConfigReport';
import { CategoryRepository } from '../../repositories';

export class ExpensesReports  {

  async execute( Expenses: Expenses[], response: Response){

    const categories = await CategoryRepository().find({order: {name: "ASC"}})
    const titleReport = "Relatório de Despesas"

    const ContentLayout = []
    for await(const categorie of categories){
      const expensesFiltered = Expenses.filter(expense => expense.category_id == categorie.id)
      const category = this.handleCategoryName(categorie.name)
      const Body = await this.handleBodyContent(expensesFiltered)
      const tableContent = this.handleContextTable(Body)
      
      if(expensesFiltered.length > 0){
        ContentLayout.push(category)
        ContentLayout.push(tableContent)
      }
    }

    await (new DefaultsConfigReport()).execute({titleReport, body: ContentLayout, response, orientationPage: 'portrait', CategoryTitleGroup: true})
    
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
          table: {
            headerRows: 1,
            widths: ["*", 200, '*', '*', '*'],
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
      rows.push(item.amount)
      rows.push(item.quantity * item.amount)

      body.push(rows)
    }
    return body
  }
}


