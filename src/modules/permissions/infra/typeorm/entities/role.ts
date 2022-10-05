import { Permission } from "@/modules/permissions/infra/typeorm/entities/permission" 
import { BaseEntity } from "@/shared/infra/typeorm/bases/base-entity" 
import { Column, Entity, JoinTable, ManyToMany } from "typeorm" 

@Entity("roles")
export class Role extends BaseEntity {
  @Column()
  name: string 

  @Column()
  description: string 

  @ManyToMany(() => Permission)
  @JoinTable({
    name: "permissions_roles",
    joinColumns: [{ name: "role_id" }],
    inverseJoinColumns: [{ name: "permission_id" }],
  })
  permissions: Permission[] 
}
