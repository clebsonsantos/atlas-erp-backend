import PdfPrinter from 'pdfmake'
import { PageOrientation, TDocumentDefinitions } from 'pdfmake/interfaces'
import { Administrator } from '../../entities/Administrator'
import { AdministratorRepository } from '../../repositories'
import LogoImage from './LogoImage'
import { Response } from 'express';

type Type = {
  titleReport: string;
  columnsTitle?: any;
  body?: any;
  response: Response;
  orientationPage: PageOrientation
}


export class DefaultsConfigReport  {

  async execute({titleReport, columnsTitle, body, response, orientationPage}: Type){
    //FONTES DO RELATÓRIO
        const fonts = {
          Helvetica: {
            normal: 'Helvetica',
            bold: 'Helvetica-Bold',
            italics: 'Helvetica-Oblique',
            bolditalics: 'Helvetica-BoldOblique'
          }
        }



        //BUSCANDO INFORMAÇÕES DO PROVEDOR
        const company:Administrator[] = await AdministratorRepository().find()
        
    
        const docDefinitions: TDocumentDefinitions = {
          pageSize: "A4",
          pageOrientation: orientationPage,
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
                  `Telefone:  ${company[0].telefone}` + "  " + `E-mail:  ${company[0].email}`,
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
