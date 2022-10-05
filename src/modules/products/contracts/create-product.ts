import { Either } from "@/shared/either";
import { AppError } from "@/shared/errors/AppError";
import { Product } from "../infra/typeorm/entities/product";

export namespace CreateProduct {
  export type Params = Omit<Product, "id" | "center_cost" | "created_at">
  export type Result = Either<AppError, Product>
}