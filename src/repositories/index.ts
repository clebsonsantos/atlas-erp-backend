  import { Role } from "../infrastructure/persistence/entities/Role";
  import { User } from "../infrastructure/persistence/entities/User";
  import { getRepository } from "typeorm";
  import { Product } from "../infrastructure/persistence/entities/Product";
  import { Permission } from "../infrastructure/persistence/entities/Permission";
  import { Expenses } from "../infrastructure/persistence/entities/Expenses";
  import { Category } from "../infrastructure/persistence/entities/Category";
  import { CentersCost } from "../infrastructure/persistence/entities/CentersCost";
  import { Administrator } from "../infrastructure/persistence/entities/Administrator";
  import { Customers } from "../infrastructure/persistence/entities/Customers";
  import { ProductSales } from "../infrastructure/persistence/entities/ProductSales";
  import { Sales } from "../infrastructure/persistence/entities/Sales";
  import { RelationsSaleProductsSolds } from "../infrastructure/persistence/entities/RelationsSaleProductsSolds";

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
    return getRepository(Customers);
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
