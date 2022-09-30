

import { Permission } from "@/modules/permissions/infra/typeorm/entities/permission"
import { Role } from "@/modules/roles/infra/typeorm/entities/role"
import { BaseEntity } from "@/shared/infra/typeorm/bases/base-entity"
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
} from "typeorm"

@Entity("users")
export class User extends BaseEntity {
  @Column()
  username: string

  @Column()
  password: string

  @Column()
  email: string

  @Column()
  phone: string

  @Column()
  full_name: string

  @ManyToMany(() => Role)
  @JoinTable({
    name: "users_roles",
    joinColumns: [{ name: "user_id" }],
    inverseJoinColumns: [{ name: "role_id" }],
  })
  roles: Role[]

  @ManyToMany(() => Permission)
  @JoinTable({
    name: "users_permissions",
    joinColumns: [{ name: "user_id" }],
    inverseJoinColumns: [{ name: "permission_id" }],
  })
  permissions: Permission[]
}
