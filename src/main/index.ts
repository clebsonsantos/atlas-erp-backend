import "./config/module-alias"
import { app } from "@/main/config/app"

import "reflect-metadata"
// import { createConnection } from "typeorm"

// createConnection()
//   .then(() => )
//   .catch(console.error)

  app.listen(3030, () => console.log(`Server running at http://localhost:3030`))