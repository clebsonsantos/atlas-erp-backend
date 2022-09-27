import path from 'path'
import fs from 'fs'
export default function LogoImage() {
  const USE_LOGO_COMPANY = process.env.USE_LOGO_COMPANY
  
  let pathFile = (USE_LOGO_COMPANY === 'true') ? path.join(__dirname, "../../../", "uploads", "company_logo.png") : path.join(__dirname, "../../../", "uploads", "atlas-logo.png");
  return "data:image/jpeg;base64,"+fs.readFileSync(pathFile, 'base64');
}