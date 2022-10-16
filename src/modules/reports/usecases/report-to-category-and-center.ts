import { TableCell } from "pdfmake/interfaces"
import { Response } from "express"
import { Category } from "@/modules/expenses/infra/typeorm/entities/category"
import { CentersCost } from "@/modules/expenses/infra/typeorm/entities/center-cost"
import { DefaultsConfigReport } from "../DefaultsConfigReport"

export class ReportToCategoryAndCenter {
  async execute(Component: Category[] | CentersCost[], response: Response) {
    //CORPO DA TABELA
    const body = []
    const columnsTitle: TableCell[] = [
      { text: "Descrição", style: "tableTitle" },
      { text: "Data de criação", style: "tableTitle" },
    ]

    for await (const item of Component) {
      const rows = new Array()
      rows.push(item.name)
      rows.push(item.created_at.toLocaleDateString("pt-BR"))

      body.push(rows)
    }
    const titleReport =
      Component[0] instanceof Category
        ? "Categorias registradas"
        : "Centros de Custo registrados"

    await new DefaultsConfigReport().execute({
      titleReport,
      columnsTitle,
      body,
      response,
      orientationPage: "portrait",
      widthsColumns: ["*", "auto"],
    })
  }
}
