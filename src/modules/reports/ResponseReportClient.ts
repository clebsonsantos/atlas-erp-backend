import PdfPrinter from 'pdfmake'
import { TDocumentDefinitions } from 'pdfmake/interfaces'
import { Response } from 'express';

type TResponseReportsDefinitions = {
  response: Response;
  docDefinitions: TDocumentDefinitions
}


export class ResponseReportClient  {

  async execute({ response, docDefinitions }: TResponseReportsDefinitions){
    //FONTES DO RELATÓRIO
    const fonts = {
      Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique'
      }
    }
    // GERANDO PDF
    const printer = new PdfPrinter(fonts)

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
