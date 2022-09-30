import { CreateCustomerController } from "@/modules/customers/controllers/create-customer"
import { DeleteCustomerController } from "@/modules/customers/controllers/delete-customer"
import { FindAllOrFilterCustomersController } from "@/modules/customers/controllers/find-all-or-filter-customer"
import { UpdateCustomerController } from "@/modules/customers/controllers/updated-customer"
import { Router } from "express"
import { can, ensuredAuthenticated, ensuredValidateUUID } from "../middlewares"

const customerRoutes = Router();

customerRoutes.post("/", ensuredAuthenticated(), can(["admin", 'customers']), new CreateCustomerController().handle)

customerRoutes.get("/", ensuredAuthenticated(), can(["admin", 'customers']), new FindAllOrFilterCustomersController().handle)

customerRoutes.put("/:id", ensuredAuthenticated(), can(["admin", 'customers']), ensuredValidateUUID(), new UpdateCustomerController().handle)

customerRoutes.delete("/:id", ensuredAuthenticated(), can(["admin", 'customers']), ensuredValidateUUID(), new DeleteCustomerController().handle) 


export { customerRoutes }