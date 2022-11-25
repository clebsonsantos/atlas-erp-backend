import { TableCell } from 'pdfmake/interfaces' 
import { inject, injectable } from "tsyringe"
import { SaleRepository } from "@/modules/sales/repositories/sales-repository"
import { ProductRepository } from "@/modules/products/repositories/product-repository"
import { AdministratorRepository } from "@/domain/contracts/repositories"
import formatCurrency from "@/utils/formatCurrency"
import salesOrdes from "../layouts/salesOrder"
import { getLogoImage } from "@/modules/reports/utils/get-logo-image"
import { RenderSaleOrderPrint } from "../contracts/render-sale-order-print"
import { left, right } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"


@injectable()
export class RenderSaleOrderPrintUseCase  {
  constructor(
    @inject("SaleRepository")
    private readonly saleRepository: SaleRepository,
    @inject("ProductRepository")
    private readonly productRepository: ProductRepository,
    @inject("AdministratorRepository")
    private readonly administratorRepository: AdministratorRepository
  ){}

  async execute({ id }: RenderSaleOrderPrint.Params): Promise<RenderSaleOrderPrint.Result>{
    const sale = await this.saleRepository.findById(id)

    if (!sale) {
      return left(new AppError("Esse registro não existe."))
    }

    const body = [ ] 
    const columnsTitle: TableCell[] = [
      {text: "Produto", style: "tableTitle"},
      {text: "Quant.", style: "tableTitle"},
      {text: "R$ Unitário", style: "tableTitle"},
      {text: "R$ Total", style: "tableTitle"},
    ]

    for await (const item of sale.products_sold){
      const rows = new Array()
      const product = await this.productRepository.findById(item.id_product)
      rows.push(product.name)
      rows.push(item.quantity)
      rows.push(formatCurrency(Number(item.price_unit)))
      rows.push(formatCurrency(Number(item.total_price)))

      body.push(rows)
    }

    const titleReport = `Pedido Nº ${sale.sale_number}`
    const client = sale.customer
    const ProductsSolds = sale.products_sold
    let totalSale = ProductsSolds.reduce((total, current)=> Number(total) + Number(current.total_price), 0)

    const findCompany = await this.administratorRepository.list()
    if (!findCompany.length) {
      return left(new AppError("Registre uma empresa antes de gerar relatórios."))
    }

    const company = findCompany[0]
    const docDefinitions = salesOrdes({orientationPage: 'portrait', company, titleReport, widthsColumns: [230, 70, 100, 70], columnsTitle, LogoImage: getLogoImage, body, client, totalSale})
    
    return right(docDefinitions)
  }
}

