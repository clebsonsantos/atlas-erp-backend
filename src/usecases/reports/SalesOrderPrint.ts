import { Sales } from '../../entities/Sales';
import { TableCell } from 'pdfmake/interfaces';
import { Response } from 'express';
import { Administrator } from '../../entities/Administrator';
import { AdministratorRepository, ProductRepository } from '../../repositories';
import salesOrdes from './layouts/salesOrder';
import LogoImage from './LogoImage'
import { ResponseReportClient } from './ResponseReportClient';
import formatCurrency from '../../utils/formatCurrency';

type SalesORder =  {
  Sales: Sales, 
  response: Response
}

export class SalesOrderPrint  {

  async execute({ Sales, response }: SalesORder){

    //CORPO DA TABELA
    const body = [ ];
    const columnsTitle: TableCell[] = [
      {text: "Produto", style: "tableTitle"},
      {text: "Quant.", style: "tableTitle"},
      {text: "R$ Unitário", style: "tableTitle"},
      {text: "R$ Total", style: "tableTitle"},
    ]
    for await (const item of Sales.products_sold){
      const rows = new Array()
      const product = await ProductRepository().findOne({id: item.id_product})
      rows.push(product.name)
      rows.push(item.quantity)
      rows.push(formatCurrency(Number(item.price_unit)))
      rows.push(formatCurrency(Number(item.total_price)))

      body.push(rows)
    }
    
    const titleReport = "Pedido Nº 40545"
    const client = Sales.customer
    const ProductsSolds = Sales.products_sold
    let totalSale = ProductsSolds.reduce((total, current)=> Number(total) + Number(current.total_price), 0)

    const findCompany:Administrator[] = await AdministratorRepository().find()
    const company = findCompany[0]

    const docDefinitions = salesOrdes({orientationPage: 'portrait', company, titleReport, widthsColumns: [230, 70, 100, 70], columnsTitle, LogoImage, body, client, totalSale})

    await (new ResponseReportClient()).execute({response, docDefinitions})
  }
}

