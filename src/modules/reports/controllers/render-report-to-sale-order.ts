import { Request, Response } from "express" 
import { container } from "tsyringe"
import { RenderSaleOrderPrintUseCase } from "../usecases/render-sale-order-print"
import { SendReportPdfToClientSide } from "../adapters/send-report-pdf-to-client-side"


export class RenderReportToSaleOrderController {

  async handle(request: Request, response: Response) {
    const { id  } = request.params

    const renderSaleOrderService = container.resolve(RenderSaleOrderPrintUseCase)

    const result = await renderSaleOrderService.execute({ id })

    if (result.isLeft()) {
      return response.status(result.value.statusCode).json(result.value)
    }
    const sendToClientSide = new SendReportPdfToClientSide()
    await sendToClientSide.execute({ response, docDefinitions: result.value})
  }
}