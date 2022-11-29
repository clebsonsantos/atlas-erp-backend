import { Customer } from "@/infra/database/entities"
import { Category } from "@/infra/database/entities"
import { CentersCost } from "@/infra/database/entities" 
import { Expenses } from "@/infra/database/entities"
import { Product } from "@/modules/products/infra/typeorm/entities/product"
import { Sales } from "@/modules/sales/infra/typeorm/entities/sale"
import { User } from "@/modules/user/infra/typeorm/entities/user"
import { Either } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"

export namespace GetDataToRenderReport {
  export type Input = {
      action?: string | any 
      initial_date?: Date | any 
      final_date?: Date | any 
      customer_id?: string | any 
      salesman?:string | any
  }

  export type Output = Either<AppError, Customer[] | Sales[] | Product[] | Category[] | CentersCost[] | Expenses[] | User[] >
}