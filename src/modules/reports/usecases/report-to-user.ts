import { TableCell } from "pdfmake/interfaces"
import { Response } from "express"
import { DefaultsConfigReport } from "../DefaultsConfigReport"
import { User } from "@/modules/user/infra/typeorm/entities/user"

export class ReportToUser {
  async execute(Users: User[], response: Response) {
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

    await new DefaultsConfigReport().execute({
      titleReport,
      columnsTitle,
      body,
      response,
      orientationPage: "portrait",
      widthsColumns: ["*", "auto", 100, "*"],
    })
  }
}
