import { Customer } from "@/modules/customers/infra/typeorm/entities/customer"
import { Category } from "@/modules/expenses/infra/typeorm/entities/category"
import { CentersCost } from "@/modules/expenses/infra/typeorm/entities/center-cost"
import { Expenses } from "@/modules/expenses/infra/typeorm/entities/expense"
import { Product } from "@/modules/products/infra/typeorm/entities/product"
import { Sales } from "@/modules/sales/infra/typeorm/entities/sale"
import { User } from "@/modules/user/infra/typeorm/entities/user"
import { Either } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"

export namespace GetDataToRenderReport {
  export type Params = {
      action?: string | any 
      initial_date?: Date | any 
      final_date?: Date | any 
      customer_id?: string | any 
      salesman?:string | any
  }

  export type Result = Either<AppError, Customer[] | Sales[] | Product[] | Category[] | CentersCost[] | Expenses[] | User[] >
}