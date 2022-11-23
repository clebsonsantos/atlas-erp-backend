import { BaseEntity } from "@/infra/database/entities/bases"
import { Permission} from "@/infra/database/entities"
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
