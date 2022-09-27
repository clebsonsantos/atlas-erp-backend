import { CreateCustomerController } from "@/modules/customers/controllers/create-customer"
import { DeleteCustomerController } from "@/modules/customers/controllers/delete-customer"
import { GetAllCustomersController } from "@/modules/customers/controllers/get-all-customer"
import { UpdateCustomerController } from "@/modules/customers/controllers/updated-customer"
import { Router } from "express"
import { can, ensuredAuthenticated, ensuredValidateUUID } from "../middlewares"

const customerRoutes = Router();
//Clientes
customerRoutes.post("/", ensuredAuthenticated(), can(["admin", 'customers']), new CreateCustomerController().handle)
customerRoutes.get("/", ensuredAuthenticated(), can(["admin", 'customers']), new GetAllCustomersController().handle)
// customerRoutes.post("/search", ensuredAuthenticated(), can(["admin", 'customers']), new GetAllCustomersController().handle)
customerRoutes.put("/:id", ensuredAuthenticated(), can(["admin", 'customers']), ensuredValidateUUID(), new UpdateCustomerController().handle)
customerRoutes.delete("/:id", ensuredAuthenticated(), can(["admin", 'customers']), ensuredValidateUUID(), new DeleteCustomerController().handle) 

export { customerRoutes }