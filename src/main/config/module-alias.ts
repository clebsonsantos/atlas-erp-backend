import { addAlias } from "module-alias"
import { resolve } from "path"

if (process.env.NODE_ENV == "production") {
  addAlias("@", resolve("dist"))
}