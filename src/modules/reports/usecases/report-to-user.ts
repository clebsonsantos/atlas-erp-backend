import { TableCell } from "pdfmake/interfaces"
import { User } from "@/modules/user/infra/typeorm/entities/user"
import { DefaultConfigReport } from "../contracts/defaults-config-reports"

export class ReportToUser {
  async execute(Users: User[]): Promise<DefaultConfigReport.Input>  {
    //CORPO DA TABELA
    const body = []
    const columnsTitle: TableCell[] = [
      { text: "Nome completo", style: "tableTitle" },
      { text: "Usuário", style: "tableTitle" },
      { text: "Telefone", style: "tableTitle" },
      { text: "E-mail \n", style: "tableTitle" },
    ]
    for await (const user of Users) {
      const rows = new Array()
      rows.push(user.full_name)
      rows.push(user.username)
      rows.push(user.phone)
      rows.push(user.email)
      body.push(rows)
    }
    const titleReport = "Usuários do sistema"

    return {
      titleReport,
      columnsTitle,
      body,
      orientationPage: "portrait",
      widthsColumns: ["*", "auto", 100, "*"],
    }
  }
}
