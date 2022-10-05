import { ICustomerRepository } from "@/modules/customers/repositories/icustomer-repository" 
import { CustomerRepository } from "@/modules/customers/infra/typeorm/repositories/customer-repository" 
import { container } from "tsyringe" 
import { IUserRepository } from "@/modules/user/repositories/iuser-repository" 
import { UserRepository } from "@/modules/user/infra/typeorm/repositories/user-repository" 
import { IPermissionRepository } from "@/modules/permissions/repositories/ipermission-repository" 
import { PermissionRepository } from "@/modules/permissions/infra/typeorm/repositories/permission-repository" 
import { IRoleRepository } from "@/modules/permissions/repositories/irole-repository" 
import { RoleRepository } from "@/modules/permissions/infra/typeorm/repositories/role-repository" 
import { ExpenseRepository } from "@/modules/expenses/infra/typeorm/repositories/expense-repository" 
import { IExpenseRepository } from "@/modules/expenses/repositories/iexpense-repository" 
import { ICategoryRepository } from "@/modules/expenses/repositories/icategory-repository" 
import { CategoryRepository } from "@/modules/expenses/infra/typeorm/repositories/category-repository" 
import { CenterCostRepository } from "@/modules/expenses/infra/typeorm/repositories/center-cost-repository" 
import { ICenterCostRepository } from "@/modules/expenses/repositories/icenter-cost-repository" 
import { ProductRepositoryImpl } from "@/modules/products/infra/typeorm/repositories/product-repository"
import { ProductRepository } from "@/modules/products/repositories/product-repository"

export function startContainer() {
  container.registerSingleton<ICustomerRepository>(
    "CustomerRepository",
    CustomerRepository
  )

  container.registerSingleton<IUserRepository>(
    "UserRepository",
    UserRepository
  )

  container.registerSingleton<IPermissionRepository>(
    "PermissionRepository",
    PermissionRepository
  )
  
  container.registerSingleton<IRoleRepository>(
    "RoleRepository",
    RoleRepository
  )

  container.registerSingleton<IExpenseRepository>(
    "ExpenseRepository",
    ExpenseRepository
  )

  container.registerSingleton<ICategoryRepository>(
    "CategoryRepository",
    CategoryRepository
  )

  container.registerSingleton<ICenterCostRepository>(
    "CenterCostRepository",
    CenterCostRepository
  )

  container.registerSingleton<ProductRepository>(
    "ProductRepository",
    ProductRepositoryImpl
  )
}

