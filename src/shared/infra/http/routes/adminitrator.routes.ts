import { GetAdministratorController } from "@/controllers/administrator/GetAdministratorController";
import { UpdateAdministratorController } from "@/controllers/administrator/UpdateAdministratorController";
import { CreateAdministratorController } from "@/modules/administrator/controllers/create-administrator-company";
import { Router } from "express";
import { can, ensuredAuthenticated, ensuredValidateUUID } from "../middlewares";


import multer from 'multer'
const storage = multer.diskStorage({
  destination: function(res, file, cb){
    cb(null, './uploads')
    
  },
  filename: function(req, file, cb) {
    cb(null, "company_logo.png")
  }
})
const upload = multer({storage})


const administratorRoutes = Router()

administratorRoutes.post("/insert", ensuredAuthenticated(), upload.single('url_image'), can(["admin"]), new CreateAdministratorController().handle)
administratorRoutes.put("/update/:id", ensuredAuthenticated(), upload.single('url_image'), can(["admin"]), ensuredValidateUUID(), new UpdateAdministratorController().handle)
administratorRoutes.get("/find", ensuredAuthenticated(), can(["admin"]), new GetAdministratorController().handle)

export { administratorRoutes }