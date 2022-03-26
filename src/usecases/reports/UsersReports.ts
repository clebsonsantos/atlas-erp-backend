import { User } from '../../entities/User';
import PdfPrinter from 'pdfmake';
import { TableCell, TDocumentDefinitions } from 'pdfmake/interfaces';
import { Response } from 'express';

export class UsersReports  {

  async execute( Users: User[], response: Response){
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
      {text: "Usuário", style: "tableTitle"},
      {text: "Telefone", style: "tableTitle"},
      {text: "E-mail \n", style: "tableTitle"},
    ]
    for await (const user of Users){
      const rows = new Array()
      rows.push(user.full_name)
      rows.push(user.username)
      rows.push(user.phone)
      rows.push(user.email)
      body.push(rows)
    }

    // GERANDO PDF
    const printer = new PdfPrinter(fonts)

    const docDefinitions: TDocumentDefinitions = {
      defaultStyle: {font: "Helvetica"},
      content: [
        {columns: [
          {text: "Relação de usuários do sistema", style: "header"},
          {text: new Date().toLocaleString() + "\n\n",  style: "header"}
        ]},
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            headerRows: 1,
            widths: [ '*', 'auto', 100, '*' ],
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
          fontSize: 14,
          bold: true,
          alignment: "center"
        },
        tableTitle: {
          fontSize: 15,
          bold: true,
          fillColor: "#ccc",
        }
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
