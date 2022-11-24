import { Admin } from "@/domain/entities"

export interface LoadAdministrator {
  execute: () => Promise<LoadAdministrator.Result>
}

export namespace LoadAdministrator {
  export type Result = Admin[]
}