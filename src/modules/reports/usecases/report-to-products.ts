import { TableCell } from "pdfmake/interfaces"
import { Response } from "express"
import { Product } from "@/modules/products/infra/typeorm/entities/product"
import formatCurrency from "@/utils/formatCurrency"
import { DefaultsConfigReport } from "../DefaultsConfigReport"

export class ReportToProducts {
  async execute(Products: Product[], response: Response) {
    //CORPO DA TABELA
    const body = []
    const columnsTitle: TableCell[] = [
      { text: "Descrição", style: "tableTitle" },
      { text: "Centro de custo", style: "tableTitle" },
      { text: "Preço padrão", style: "tableTitle" },
      { text: "Data de criação\n", style: "tableTitle" },
    ]

    for await (const product of Products) {
      const rows = new Array()
      const center = product.center_cost
      rows.push(product.name)
      rows.push(center.name)
      rows.push(formatCurrency(Number(product.price_default)))
      rows.push(product.created_at.toLocaleDateString("pt-BR"))
      body.push(rows)
    }
    const titleReport = "Produtos Cadastrados"

    await new DefaultsConfigReport().execute({
      titleReport,
      columnsTitle,
      body,
      response,
      orientationPage: "portrait",
      widthsColumns: [100, 150, 100, 100],
    })
  }
}
