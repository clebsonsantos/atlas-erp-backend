import { Router } from "express";


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

// administratorRoutes.post("/insert", ensuredAuthenticated(), upload.single('url_image'), can(["admin"]), new CreateAdministratorController().handle)

export { administratorRoutes }