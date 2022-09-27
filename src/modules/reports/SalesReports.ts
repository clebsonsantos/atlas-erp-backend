import { CustomerRepository, ProductRepository, UserRepository } from '../../repositories/index';
import { TableCell } from 'pdfmake/interfaces';
import { Sales } from '../../entities/Sales';
import { Response } from 'express';
import { DefaultsConfigReport } from './DefaultsConfigReport';
import formatCurrency from '../../utils/formatCurrency';
import { Customers } from '../../entities/Customers';


export class SalesReports  {

  async execute( Sales: Sales[], time_course: string, customer_id: string | any, salesman: string | any, response: Response){
    const ondisplay = customer_id === '' ? false : true
    const {body, valuetotal} = await this.handleBodyContent(Sales, ondisplay)
    const ContentTable = this.handleContextTable(body)
    if(ondisplay){
      var customer:Customers = await CustomerRepository().findOne({id: customer_id}) 
    }
    const saller = salesman !== undefined ? UserRepository().findOne({id: Sales[0].salesman}) : ""
    const salesmanName = saller === '' ? '' : `\n\nVendedor: ${(await saller).full_name}`

    const titleReport = `Relatório de vendas${ondisplay ? '\n\nCliente: '+customer.full_name : ''}${salesmanName}${time_course}`
    
    await (new DefaultsConfigReport()).execute({titleReport, body: [ContentTable], response, orientationPage: 'portrait', CategoryTitleGroup: true, widthsColumns: [100, 'auto', '*'], totalExpenses: valuetotal})
  }
  handleContextTable = (body:any[]) => {  
    return {
          layout: 'lightHorizontalLines', 
          fontSize: 11.5,
          table: {
            headerRows: 1,
            widths: [150, 50, '*', 80],
            heights: function (){
              return 15;
            },
            body: [
              ...body
            ]
          }
        }
  }
  async handleBodyContent(Sales: Sales[], ondisplayName?: boolean){
    //CORPO DA TABELA
    const body = [ ];
    var addLine = false
    let valuetotal = 0
    for await (const sale of Sales){

    const totalSolds = sale.products_sold.reduce((total, current)=> Number(total) + Number(current.total_price), 0)
    valuetotal += totalSolds
    const notDisplayName = ondisplayName ? 'Valor unitário' : `Cliente: ${sale.customer.full_name}`
    const columnsTitle: TableCell[] = [
      {text: `Data: ${sale.date.toLocaleDateString('pt-BR')}`, style: "tableTitle"},
      {text: `Nº: ${sale.sale_number}`, style: `tableTitle`},
      {text: `${notDisplayName}`, style: `tableTitle`},
      {text: `Subtotal`, style: `tableTitle`},
    ]

    body.push(columnsTitle)
      for await (const product of sale.products_sold){
        const rows = new Array()
        const name_product = await ProductRepository().findOne({id: product.id_product})

        rows.push(`Item: ` + name_product.name)
        rows.push(`Quant: ` + product.quantity)
        rows.push(`Unitário: ` + formatCurrency(Number(product.price_unit)))
        rows.push(formatCurrency(Number(product.total_price)))

        body.push(rows)
        
        
      }
      addLine = true
      do {
        const rowEmpty = new Array()
        rowEmpty.push(`` )
        rowEmpty.push(`` )
        rowEmpty.push(`Total: `)
        rowEmpty.push(formatCurrency(totalSolds))
  
        body.push(rowEmpty)
        addLine = false        
      }while(addLine)
    }

    return {
      body,
      valuetotal
    }
  }
}
