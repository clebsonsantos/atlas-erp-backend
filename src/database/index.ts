import { createConnection } from "typeorm";
import { CreateUserSupport, DefaultPermissionsSystem } from '../config';

createConnection().then(async ()=>{
  await CreateUserSupport()
  await DefaultPermissionsSystem()
})
