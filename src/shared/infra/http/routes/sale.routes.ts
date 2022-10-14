import { GettAllSaleProductsController } from "@/controllers/sales/GettAllSaleProductsController";
import { DeleteSaleProductsController } from "@/controllers/sales/DeleteSaleProductsController";
import { UpdateSaleProductsController } from "@/controllers/sales/UpdateSaleProductsController";
import { CreateSaleAndProductsAssociateController } from "@/modules/sales/controllers/create-sale-and-products-associate.ts";
import { Router } from "express";
import { can, ensuredAuthenticated, ensuredValidateUUID } from "../middlewares";


const saleRoutes = Router()

saleRoutes.post("/insert", ensuredAuthenticated(), can(["admin", 'sales']), new CreateSaleAndProductsAssociateController().handle)
saleRoutes.get("/list'", ensuredAuthenticated(), can(["admin", 'sales']), new GettAllSaleProductsController().handle)
saleRoutes.delete("/delete/:id", ensuredAuthenticated(), can(["admin", 'sales']), ensuredValidateUUID(), new DeleteSaleProductsController().handle)
saleRoutes.put("/update/:id", ensuredAuthenticated(), can(["admin", 'sales']), ensuredValidateUUID(), new UpdateSaleProductsController().handle)


export { saleRoutes }