import { UpdateSaleProductsController } from "@/controllers/sales/UpdateSaleProductsController";

import { CreateSaleAndProductsAssociateController } from "@/modules/sales/controllers/create-sale-and-products-associate.ts";
import { DeleteSaleProductsAssociateController } from "@/modules/sales/controllers/delete-sale-products-associate";
import { ListAllSaleProductsController } from "@/modules/sales/controllers/list-all-sale-products";
import { Router } from "express";
import { can, ensuredAuthenticated, ensuredValidateUUID } from "../middlewares";


const saleRoutes = Router()

saleRoutes.post("/insert", ensuredAuthenticated(), can(["admin", 'sales']), new CreateSaleAndProductsAssociateController().handle)
saleRoutes.get("/list'", ensuredAuthenticated(), can(["admin", 'sales']), new ListAllSaleProductsController().handle)
saleRoutes.delete("/delete/:id", ensuredAuthenticated(), can(["admin", 'sales']), ensuredValidateUUID(), new DeleteSaleProductsAssociateController().handle)
saleRoutes.put("/update/:id", ensuredAuthenticated(), can(["admin", 'sales']), ensuredValidateUUID(), new UpdateSaleProductsController().handle)


export { saleRoutes }