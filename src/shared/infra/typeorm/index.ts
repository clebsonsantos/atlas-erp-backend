import { createUserSupport, DefaultPermissionsSystem } from "@/main/config" 
import { createConnection } from "typeorm" 

export const conecctionPg = async (): Promise<void> => {
  try {
    await createConnection()
    // const nextAction = await DefaultPermissionsSystem()
    // if(nextAction){
    //   await createUserSupport()
    // }
  } catch (err) {
    console.warn("connection failed: ", err)
  }
}