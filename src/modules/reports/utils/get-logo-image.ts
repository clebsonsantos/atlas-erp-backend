import path from 'path'
import fs from 'fs/promises'
export async function getLogoImage() {
  const USE_LOGO_COMPANY = process.env.USE_LOGO_COMPANY
  const pathCwd = process.cwd()
  
  let pathFile = USE_LOGO_COMPANY === 'true' ? path.join(pathCwd, "uploads", "company_logo.png") : path.join(pathCwd, "uploads", "atlas-logo.png") 
  const renderImage = await fs.readFile(pathFile, 'base64')
  return "data:image/jpeg base64,".concat(renderImage)
}