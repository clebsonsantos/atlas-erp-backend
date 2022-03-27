
import { Product } from '../../entities/Product';
import PdfPrinter from 'pdfmake';
import { TableCell, TDocumentDefinitions } from 'pdfmake/interfaces';
import { Response } from 'express';
import { AdministratorRepository } from '../../repositories';
import { Administrator } from '../../entities/Administrator';
import LogoImage from './LogoImage';

export class ProductsReports  {

  async execute( Products: Product[], response: Response){
    const fonts = {
      Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique'
      }
    }

    //CORPO DA TABELA
    const body = [ ];
    const columnsTitle: TableCell[] = [
      {text: "Descrição", style: "tableTitle"},
      {text: "Centro de custo", style: "tableTitle"},
      {text: "Preço padrão", style: "tableTitle"},
      {text: "Data de criação\n", style: "tableTitle"},
    ]
    for await (const product of Products){
      const rows = new Array()
      const center = product.center_cost
      rows.push(product.name)
      rows.push(center.name)
      rows.push(product.price_default)
      rows.push(product.created_at.toLocaleString())
      body.push(rows)
    }

    // GERANDO PDF
    const printer = new PdfPrinter(fonts)

    //BUSCANDO INFORMAÇÕES DO PROVEDOR
    const company:Administrator[] = await AdministratorRepository().find()
    

    const docDefinitions: TDocumentDefinitions = {
      pageSize: "A4",
      defaultStyle: {font: "Helvetica"},
      footer: function(currentPage, pageCount) { 
        return { text: "página " + currentPage.toString() + ' de ' + pageCount, alignment: 'right', margin: 6 }
       },
      header: function() {
        return {text: "Emissão: "+new Date().toLocaleString() ,  style: "timestamp"}
      },
      content: [
        {
          columns: [
            { image: 'imageHeader',  width: 120},
            {
              ol: [
              `Razão social:  ${company[0].razao}`,
              `Fantasia: ${company[0].fantasia}`,
              `CPF/CNPJ:  ${company[0].cpf_cnpj}` + "  " +`Insc. estadual:  ${company[0].insc_estadual}`,
              `Endereço:  ${company[0].endereco}, ${company[0].numero}, ${company[0].bairro}`,
              `Cidade/UF:  ${company[0].cidade}-${company[0].uf}`,
              `Telefone:  ${company[0].telefone}`,
            ],
            type: 'none',
            style: "header"
          },
        ]
      },
      
      {
        columns: [
          {text:  "\n\rPRODUTOS CADASTRADOS\n\r",  style: "titleContent"}
        ]
      },
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            headerRows: 1,
            // widths: [ '*', 'auto', 100, '*' ],
            heights: function (row){
              return 15;
            },
            body: [
              columnsTitle,
              ...body
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 12,
          margin: [12, 0, 0, 4],
          alignment: 'left'
          // bold: true,
        },
        titleContent: {
          fontSize: 14,
          bold: true,
          alignment: 'center'
        },
        tableTitle: {
          fontSize: 13,
          bold: true,
          fillColor: "#ccc",
          margin: 2
        },
        timestamp: {
          alignment: 'right',
          margin: 6
        }
      },
      images: {
        imageHeader: LogoImage()
      }
    }

    //REPASSANDO PDF PARA RESPONSE
    const pdfDoc = printer.createPdfKitDocument(docDefinitions)

    const chuncks = []
    pdfDoc.on("data", (chunk)=>{
      chuncks.push(chunk)
    })

    pdfDoc.end();

    pdfDoc.on("end", ()=>{
      const result = Buffer.concat(chuncks)
      response.end(result)
    })
  }
}
