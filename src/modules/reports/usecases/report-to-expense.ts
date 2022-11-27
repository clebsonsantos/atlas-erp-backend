import { Column, TableCell } from "pdfmake/interfaces"
import { Expenses } from "@/infra/database/entities"
import formatCurrency from "@/utils/formatCurrency"
import { inject, injectable } from "tsyringe"
import { CategoryRepository } from "@/domain/contracts/repositories"
import { DefaultConfigReport } from "../contracts/defaults-config-reports"

@injectable()
export class ReportToExpenses {
  constructor(
    @inject("CategoryRepository")
    private readonly categoryRepository: CategoryRepository
  ) {}

  async execute(
    Expenses: Expenses[],
    centerName: string | string[] | any,
    time_course: string
  ): Promise<DefaultConfigReport.Input> {
    const categories = await this.categoryRepository.list()
    
    const ExpensesFilter = centerName
      ? Expenses.filter((fill) => fill.center_cost_id == centerName)
      : Expenses
    let center: string = centerName
      ? "\n\nCentro de custo: " + ExpensesFilter[0].center_cost.name
      : ""

    const titleReport = `Relatório de Despesas${center}${time_course}`

    const ContentLayout = []

    for await (const categorie of categories) {
      const expensesFiltered = ExpensesFilter.filter(
        (expense) => expense.category_id == categorie.id
      )
      const category = this.handleCategoryName(categorie.name)
      const Body = await this.handleBodyContent(expensesFiltered)
      const tableContent = this.handleContextTable(Body)

      if (expensesFiltered.length > 0) {
        ContentLayout.push(category)
        ContentLayout.push(tableContent)
      }
    }
    let totalExpenses = ExpensesFilter.reduce(
      (total, current) =>
        Number(total) + Number(current.quantity) * Number(current.amount),
      0
    )

    return {
      titleReport,
      body: ContentLayout,
      orientationPage: "portrait",
      CategoryTitleGroup: true,
      totalExpenses,
    }
  }

  handleCategoryName = (category: string): Column[] => {
    return [
      {
        text: category.toUpperCase(),
        alignment: "left",
        bold: true,
        fontSize: 13,
        color: "#433d52",
        margin: [0, 10, 0, 10],
      },
    ]
  }

  handleContextTable = (body: any[]) => {
    return {
      layout: "lightHorizontalLines",
      margin: [-15, 0, 0, 0],
      fontSize: 11.5,
      table: {
        headerRows: 1,
        widths: [70, 200, 48, 80, 80],
        heights: function () {
          return 15
        },
        body: [...body],
      },
    }
  }
  async handleBodyContent(Expenses: Expenses[]) {
    //CORPO DA TABELA
    const body = []
    const columnsTitle: TableCell[] = [
      { text: "Data", style: "tableTitle" },
      { text: "Descrição", style: "tableTitle" },
      { text: "Quant.", style: "tableTitle" },
      { text: "Valor", style: "tableTitle" },
      { text: "Subtotal", style: "tableTitle" },
    ]

    body.push(columnsTitle)

    for await (const item of Expenses) {
      const rows = new Array()
      rows.push(item.date.toLocaleDateString("pt-BR"))
      rows.push(item.description)
      rows.push(item.quantity)
      rows.push(formatCurrency(Number(item.amount)))
      rows.push(formatCurrency(item.quantity * item.amount))

      body.push(rows)
    }
    return body
  }
}
