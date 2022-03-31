import { PageOrientation, Size, TDocumentDefinitions } from 'pdfmake/interfaces';
import { Administrator } from '../../../entities/Administrator';
import HeadersReport from './header';

type DefaultCongig = {
  company: Administrator;
  titleReport: string;
  columnsTitle?: any;
  body?: any;
  orientationPage: PageOrientation;
  widthsColumns?: Size[];
  LogoImage: void | any
}

const defaultLayout  = ({orientationPage, company, titleReport, widthsColumns, columnsTitle, LogoImage, body}: DefaultCongig): TDocumentDefinitions => {

  return {
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
        columns: HeadersReport(company, "imageHeader", 'header')
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
          widths: widthsColumns,
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
  
}

export default defaultLayout
