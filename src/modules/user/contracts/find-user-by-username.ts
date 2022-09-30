import { Either } from '@/shared/either';
import { User } from "../infra/typeorm/entities/user";

export namespace FindUserByUsername {
  export type Params = {
    username: string
  }
  export type Result = Either<Error, User>
}