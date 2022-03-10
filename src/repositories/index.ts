import { Role } from "../entities/Role";
import { User } from "../entities/User";
import { getRepository } from "typeorm";
import { Product } from "../entities/Product";
import { Permission } from "../entities/Permission";
import { Expenses } from '../entities/Expenses';
import { Category } from '../entities/Category';
import { CentersCost } from '../entities/CentersCost';
import { Administrator } from '../entities/Administrator';
import { Customers } from '../entities/Customers';
import { ProductSales } from '../entities/ProductSales';
import { Sales } from '../entities/Sales';
import { RelationsSaleProductsSolds } from '../entities/RelationsSaleProductsSolds';

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


