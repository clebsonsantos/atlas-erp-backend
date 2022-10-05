import { getRepository } from "typeorm";

import { Customer } from "@/modules/customers/infra/typeorm/entities/customer";
import { User } from "@/modules/user/infra/typeorm/entities/user";
import { Role } from "@/modules/permissions/infra/typeorm/entities/role";
import { Permission } from "@/modules/permissions/infra/typeorm/entities/permission";
import { Product } from "@/modules/products/infra/typeorm/entities/product";
import { Expenses } from "@/modules/expenses/infra/typeorm/entities/expense";
import { Category } from "@/modules/expenses/infra/typeorm/entities/category";
import { CentersCost } from "@/modules/expenses/infra/typeorm/entities/center-cost";
import { Administrator } from "@/modules/administrator/infra/typeorm/entities/adminitrator";
import { ProductSales } from "@/modules/sales/infra/typeorm/entities/product-sale";
import { Sales } from "@/modules/sales/infra/typeorm/entities/sale";
import { RelationsSaleProductsSolds } from "@/modules/sales/infra/typeorm/entities/relation-sale-product-sold";

export const UserRepository = () => {
  return getRepository(User);
};

export const RoleRepository = () => {
  return getRepository(Role);
};

export const PermissionRepository = () => {
  return getRepository(Permission);
};

export const ProductRepository = () => {
  return getRepository(Product);
};

export const ExpenseRepository = () => {
  return getRepository(Expenses);
};

export const CategoryRepository = () => {
  return getRepository(Category);
};

export const CenterCostRepository = () => {
  return getRepository(CentersCost);
};

export const AdministratorRepository = () => {
  return getRepository(Administrator);
};

export const CustomerRepository = () => {
  return getRepository(Customer);
};

export const ProductsSoldsRepository = () => {
  return getRepository(ProductSales);
};

export const SalesRepository = () => {
  return getRepository(Sales);
};

export const RelationsSaleProductsRepository = () => {
  return getRepository(RelationsSaleProductsSolds);
};


