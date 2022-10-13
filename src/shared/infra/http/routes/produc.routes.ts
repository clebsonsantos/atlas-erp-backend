import { CreateProductController } from "@/modules/products/controllers/create-product";
import { DeleteProductController } from "@/modules/products/controllers/delete-product";
import { UpdateProductController } from "@/modules/products/controllers/update-product";
import { GetAllProductsController } from "@/modules/products/controllers/list-or-filter-product";
import { Router } from "express";
import { can, ensuredAuthenticated, ensuredValidateUUID } from "../middlewares";


const productRoutes = Router()

productRoutes.get("/products", ensuredAuthenticated(), can(["admin", 'products']), new GetAllProductsController().handle)
productRoutes.post("/products", ensuredAuthenticated(), can(["admin", 'products']), new CreateProductController().handle)
productRoutes.put("/products/:id", ensuredAuthenticated(), can(["admin", 'products']), ensuredValidateUUID(),new UpdateProductController().handle)
productRoutes.delete("/products/:id", ensuredAuthenticated(), can(["admin", 'products']), ensuredValidateUUID(), new DeleteProductController().handle)


export { productRoutes }