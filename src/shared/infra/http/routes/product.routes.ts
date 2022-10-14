import { CreateProductController } from "@/modules/products/controllers/create-product";
import { DeleteProductController } from "@/modules/products/controllers/delete-product";
import { UpdateProductController } from "@/modules/products/controllers/update-product";
import { GetAllProductsController } from "@/modules/products/controllers/list-or-filter-product";
import { Router } from "express";
import { can, ensuredAuthenticated, ensuredValidateUUID } from "../middlewares";


const productRoutes = Router()

productRoutes.get("/list", ensuredAuthenticated(), can(["admin", 'products']), new GetAllProductsController().handle)
productRoutes.post("/insert", ensuredAuthenticated(), can(["admin", 'products']), new CreateProductController().handle)
productRoutes.put("/update/:id", ensuredAuthenticated(), can(["admin", 'products']), ensuredValidateUUID(),new UpdateProductController().handle)
productRoutes.delete("/delete/:id", ensuredAuthenticated(), can(["admin", 'products']), ensuredValidateUUID(), new DeleteProductController().handle)


export { productRoutes }