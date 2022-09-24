import { createConnection } from "typeorm";
import { CreateUserSupport, DefaultPermissionsSystem } from '../config';

createConnection().then(async ()=>{
  const nextAction = await DefaultPermissionsSystem()
  if(nextAction){
    await CreateUserSupport()
  }
}).catch(err=> {
  console.log("🚀 ~ Erro ao se conectar com o banco de dados", err)
})
