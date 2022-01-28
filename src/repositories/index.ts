import { Role } from "../entities/Role";
import { User } from "../entities/User";
import { getRepository } from "typeorm";
import { Product } from "../entities/Product";
import { Permission } from "../entities/Permission";
import { Expenses } from '../entities/Expenses';
import { Category } from '../entities/Category';
import { CentersCost } from '../entities/CentersCost';

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

