import { TableCell } from "pdfmake/interfaces"
import { Customer } from "@/modules/customers/infra/typeorm/entities/customer"
import { DefaultConfigReport } from "../contracts/defaults-config-reports"

export class ReportToCustomer {
  async execute(Customers: Customer[]): Promise<DefaultConfigReport.Params> {
    //CORPO DA TABELA
    const body = []
    const columnsTitle: TableCell[] = [
      { text: "Nome completo", style: "tableTitle" },
      { text: "CPF/CNPJ", style: "tableTitle" },
      // {text: "Insc.Estadual", style: "tableTitle"},
      { text: "E-mail", style: "tableTitle" },
      { text: "Telefone", style: "tableTitle" },
      { text: "Endereço", style: "tableTitle" },
    ]
    for await (const item of Customers) {
      const rows = new Array()
      rows.push(item.full_name)
      rows.push(item.cpf_cnpj)
      // rows.push(item.state_registration)
      rows.push(item.email)
      rows.push(item.phone)
      rows.push(`${item.address}, ${item.city}, ${item.state}`)

      body.push(rows)
    }
    const titleReport = "Cadastros de clientes"

     return {
      titleReport,
      columnsTitle,
      body,
      orientationPage: "landscape",
    }
  }
}
