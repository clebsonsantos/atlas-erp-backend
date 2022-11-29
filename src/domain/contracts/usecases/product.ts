import { ProductDTO } from "@/domain/entities";
import { AlreadyExists, Failure, InvalidFieldError } from "@/domain/errors";
import { Either } from "@/shared/either";

type Invalid = InvalidFieldError | AlreadyExists | Failure

export interface CreateProduct {
  execute: (input: CreateProduct.Input) => Promise<CreateProduct.Output>
}
export namespace CreateProduct {
  export type Input = Omit<ProductDTO, "id" | "center_cost" | "created_at">
  export type Output = Either<Invalid, ProductDTO>
}

export interface DeleteProduct {
  execute: (input: DeleteProduct.Input) => Promise<DeleteProduct.Output>
}
export namespace DeleteProduct {
  export type Input = {
    id: string
  }
  export type Output = Either<Invalid, string>
}

export interface UpdatedProduct {
  execute: (input: UpdatedProduct.Input) => Promise<UpdatedProduct.Output>
}
export namespace UpdatedProduct {
  export type Input = Omit<ProductDTO, "center_cost" | "created_at">
  export type Output = Either<Invalid, ProductDTO>
}

export interface ListProducts {
  execute: () => Promise<ProductDTO[]>
}