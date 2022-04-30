import { createConnection } from "typeorm";
import { CreateUserSupport, DefaultPermissionsSystem } from '../config';

createConnection().then(async ()=>{
  const nextAction = await DefaultPermissionsSystem()
  if(nextAction){
    await CreateUserSupport()
  }
})
