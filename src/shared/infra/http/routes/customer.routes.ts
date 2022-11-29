
import { Router } from "express"
// import { can, ensuredAuthenticated, ensuredValidateUUID } from "../middlewares"

const customerRoutes = Router() 

// customerRoutes.post("/insert", ensuredAuthenticated(), can(["admin", 'customers']), new CreateCustomerController().handle)

// customerRoutes.get("/list-or-filter", ensuredAuthenticated(), can(["admin", 'customers']), new FindAllOrFilterCustomersController().handle)

// customerRoutes.put("/update/:id", ensuredAuthenticated(), can(["admin", 'customers']), ensuredValidateUUID(), new UpdateCustomerController().handle)

// customerRoutes.delete("/delete/:id", ensuredAuthenticated(), can(["admin", 'customers']), ensuredValidateUUID(), new DeleteCustomerController().handle) 


export { customerRoutes }