import { Customers } from '../../entities/Customers';
import { Administrator } from '../../entities/Administrator';
import PdfPrinter from 'pdfmake';
import { TableCell, TDocumentDefinitions } from 'pdfmake/interfaces';
import { Response } from 'express';
import { AdministratorRepository } from '../../repositories';
import LogoImage from './LogoImage';

export class CustomersReports  {

  async execute( Customers: Customers[], response: Response){
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
      {text: "Nome completo", style: "tableTitle"},
      {text: "CPF/CNPJ", style: "tableTitle"},
      // {text: "Insc.Estadual", style: "tableTitle"},
      {text: "E-mail", style: "tableTitle"},
      {text: "telefone", style: "tableTitle"},
      {text: "Endereço", style: "tableTitle"},
    ]
    for await (const item of Customers){
      const rows = new Array()
      rows.push(item.full_name)
      rows.push(item.cpf_cnpj)
      // rows.push(item.state_registration)
      rows.push(item.email)
      rows.push(item.phone)
      rows.push(`${item.address}, ${item.city}, ${item.state}`)

      body.push(rows)
    }
    const titleReport = "Cadastros de cliente"

    // GERANDO PDF
    const printer = new PdfPrinter(fonts)

    //BUSCANDO INFORMAÇÕES DO PROVEDOR
    const company:Administrator[] = await AdministratorRepository().find()
    

    const docDefinitions: TDocumentDefinitions = {
      pageSize: "A4",
      pageOrientation: 'landscape',
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
          {text:  `\n\r${titleReport.toUpperCase()}\n\r`,  style: "titleContent"}
        ]
      },
        {
          layout: 'lightHorizontalLines', 
          table: {
            headerRows: 1,
            // widths: [ '*', 'auto', 100, "auto", "auto", "auto"  ],
            heights: function (){
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
          margin: [2, 2, 2, 5]
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

