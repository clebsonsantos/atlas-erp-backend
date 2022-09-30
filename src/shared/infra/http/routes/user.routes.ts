import { CreateUserController } from "@/modules/user/controllers/create-user"
import { CreateUserAccessControlListController } from "@/modules/user/controllers/create-user-access-controll-list"
import { DeleteUserController } from "@/modules/user/controllers/delete-user"
import { FindAllUsersController } from "@/modules/user/controllers/find-all-users"
import { FindUserByUsernameController } from "@/modules/user/controllers/find-user-by-username"
import { UpdatedUserInfoController } from "@/modules/user/controllers/updated-user-info"
import { Router } from "express"
import { can, ensuredAuthenticated, ensuredValidateUUID } from "../middlewares"


const userRoutes = Router()

userRoutes.post("/", ensuredAuthenticated(), can(["admin"]), new CreateUserController().handle)

userRoutes.get("/",  ensuredAuthenticated(), new FindAllUsersController().handle)

userRoutes.post("/find_user",  ensuredAuthenticated(), new FindUserByUsernameController().handle)

userRoutes.put("/:id", ensuredAuthenticated(), ensuredValidateUUID(), new UpdatedUserInfoController().handle)

userRoutes.delete("/:id", ensuredAuthenticated(), can(["admin"]), ensuredValidateUUID(), new DeleteUserController().handle)

userRoutes.post(
  "/acl/:userId",
  ensuredAuthenticated(),
  can(["admin"]),
  ensuredValidateUUID(),
  new CreateUserAccessControlListController().handle
)

export { userRoutes }