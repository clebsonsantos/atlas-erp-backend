
import { TableCell } from "pdfmake/interfaces"
import { inject, injectable } from "tsyringe"
import { ICustomerRepository } from "@/modules/customers/repositories/icustomer-repository"
import { IUserRepository } from "@/modules/user/repositories/iuser-repository"
import { ProductRepository } from "@/modules/products/repositories/product-repository"
import { Sales } from "@/modules/sales/infra/typeorm/entities/sale"
import { Customer } from "@/modules/customers/infra/typeorm/entities/customer"
import formatCurrency from "@/utils/formatCurrency"
import { DefaultConfigReport } from "../contracts/defaults-config-reports"

@injectable()
export class ReportToSale {
  constructor(
    @inject("CustomerRepository")
    private readonly customerRepository: ICustomerRepository,
    @inject("ProductRepository")
    private readonly productRepository: ProductRepository,
    @inject("UserRepository")
    private readonly userRepository: IUserRepository
  ){}

  async execute(
    Sales: Sales[],
    time_course: string,
    customer_id: string | any,
    salesman: string | any,
  ): Promise<DefaultConfigReport.Params>  {
    const ondisplay = customer_id === "" ? false : true
    const { body, valuetotal } = await this.handleBodyContent(Sales, ondisplay)
    const ContentTable = this.handleContextTable(body)

    if (ondisplay) {
      var customer: Customer = await this.customerRepository.findById(customer_id)
    }

    const saller =
      salesman !== undefined
        ? this.userRepository.findById(Sales[0].salesman)
        : ""

    const salesmanName =
      saller === "" ? "" : `\n\nVendedor: ${(await saller).full_name}`

    const titleReport = `Relatório de vendas${
      ondisplay ? "\n\nCliente: " + customer.full_name : ""
    }${salesmanName}${time_course}`

    return {
      titleReport,
      body: [ContentTable],
      orientationPage: "portrait",
      CategoryTitleGroup: true,
      widthsColumns: [100, "auto", "*"],
      totalExpenses: valuetotal,
    }
  }

  handleContextTable = (body: any[]) => {
    return {
      layout: "lightHorizontalLines",
      fontSize: 11.5,
      table: {
        headerRows: 1,
        widths: [150, 50, "*", 80],
        heights: function () {
          return 15
        },
        body: [...body],
      },
    }
  }

  async handleBodyContent(Sales: Sales[], ondisplayName?: boolean) {
    //CORPO DA TABELA
    const body = []
    var addLine = false
    let valuetotal = 0
    for await (const sale of Sales) {
      const totalSolds = sale.products_sold.reduce(
        (total, current) => Number(total) + Number(current.total_price),
        0
      )
      valuetotal += totalSolds
      const notDisplayName = ondisplayName
        ? "Valor unitário"
        : `Cliente: ${sale.customer.full_name}`
      const columnsTitle: TableCell[] = [
        {
          text: `Data: ${sale.date.toLocaleDateString("pt-BR")}`,
          style: "tableTitle",
        },
        { text: `Nº: ${sale.sale_number}`, style: `tableTitle` },
        { text: `${notDisplayName}`, style: `tableTitle` },
        { text: `Subtotal`, style: `tableTitle` },
      ]

      body.push(columnsTitle)
      for await (const product of sale.products_sold) {
        const rows = new Array()
        const name_product = await this.productRepository.findById(product.id_product)

        rows.push(`Item: ` + name_product.name)
        rows.push(`Quant: ` + product.quantity)
        rows.push(`Unitário: ` + formatCurrency(Number(product.price_unit)))
        rows.push(formatCurrency(Number(product.total_price)))

        body.push(rows)
      }
      addLine = true
      do {
        const rowEmpty = new Array()
        rowEmpty.push(``)
        rowEmpty.push(``)
        rowEmpty.push(`Total: `)
        rowEmpty.push(formatCurrency(totalSolds))

        body.push(rowEmpty)
        addLine = false
      } while (addLine)
    }

    return {
      body,
      valuetotal,
    }
  }
}
