import { createConnection } from "typeorm";
import { CreateUserSupport } from '../config';

createConnection().then(async ()=>{
  await CreateUserSupport()
})
