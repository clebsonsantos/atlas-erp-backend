import { Either } from "@/shared/either"
import { AppError } from "@/shared/errors/AppError"
import { CentersCost } from "../infra/typeorm/entities/center-cost"

export namespace CreateCenterCost {
  export type Input = {
    name: string
  }
  export type Output = Either<AppError, CentersCost>
}