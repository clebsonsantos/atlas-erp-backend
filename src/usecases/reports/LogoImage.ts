import path from 'path'
import fs from 'fs'

export default function LogoImage() {
  let pathFile = path.join(__dirname, "../../../", "uploads", "atlas-logo.png");
  return "data:image/jpeg;base64,"+fs.readFileSync(pathFile, 'base64');
}