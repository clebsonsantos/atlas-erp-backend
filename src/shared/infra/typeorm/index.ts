import { CreateUserSupport, DefaultPermissionsSystem } from "@/main/config" 
import { createConnection } from "typeorm" 

createConnection().then(async ()=>{
  const nextAction = await DefaultPermissionsSystem()
  if(nextAction){
    await CreateUserSupport()
  }
}).catch(err=> {
  console.warn("connection failed ", err)
})
