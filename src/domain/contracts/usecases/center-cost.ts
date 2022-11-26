import { CenterCostDTO } from "@/domain/entities"
import { AlreadyExists, Failure, InvalidFieldError, RelationshipError } from "@/domain/errors"
import { Either } from "@/shared/either"

type Invalid = InvalidFieldError | AlreadyExists | Failure

export interface CreateCenterCost {
  execute: (params: CreateCenterCost.Input) => Promise<CreateCenterCost.Output>
}
export namespace CreateCenterCost {
  export type Input = {
    name: string
  }
  export type Output = Either<Invalid, CenterCostDTO>
}

export interface DeleteCenterCost {
  execute: (params: DeleteCenterCost.Input) => Promise<DeleteCenterCost.Output>
}
export namespace DeleteCenterCost {
  export type Input = {
    id: string
  }
  export type Output = Either<RelationshipError | Failure, string>
}

export interface UpdatedCenterCost {
  execute: (params: UpdatedCenterCost.Input) => Promise<UpdatedCenterCost.Output>
}
export namespace UpdatedCenterCost {
  export type Input = {
    id: string
    name: string
  }
  export type Output = Either<Invalid, CenterCostDTO>
}

export interface LoadCenterCost {
  execute:  () => Promise<LoadCenterCost.Output>
}
export namespace LoadCenterCost {
  export type Output = CenterCostDTO[]
}