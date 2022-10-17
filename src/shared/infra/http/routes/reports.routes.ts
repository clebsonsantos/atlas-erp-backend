import { RenderReportByConditioncontroller } from "@/modules/reports/controllers/render-report-by-condition"
import { RenderReportToSaleOrderController } from "@/modules/reports/controllers/render-report-to-sale-order"
import { Router } from "express"
import { can, ensuredAuthReports, ensuredValidateUUID } from "../middlewares"

const reportsRoutes = Router()

reportsRoutes.get("/render", ensuredAuthReports(), can(["admin", 'reports']), new RenderReportByConditioncontroller().handle)
reportsRoutes.get("/salesorder/:id", ensuredAuthReports(), can(["admin", 'reports']), ensuredValidateUUID(), new RenderReportToSaleOrderController().handle)

export { reportsRoutes }