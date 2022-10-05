import ChildProcess from 'child_process'
import GoogleDriveService from '../sync-drive'
import * as fs from 'fs'
import * as path from 'path'

function ExecOnBackups() {
  // docker exec pg_dumpall -U postgres > ./my_backup.sql
  ChildProcess.exec('bash ./on_backups.sh', (err, cb)=> {
    if(err){
      console.log("🚀 ~ file: on-backups.ts ~ line 8 ~ ChildProcess.exec ~ err", err)
    }else{
      console.log("🚀 ~ file: on-backups.ts ~ line 11 ~ ChildProcess.exec ~ cb", cb)
    }
  })
}

const TimeOutBackups = () => {
  const timerDonwload = 600000 * 3 //! 30 minutes
  const timerUploadDriver = 600000 * 6 * 24//! 24 hour
  setInterval(()=> {
    ExecOnBackups()
  }, timerDonwload)

  setInterval(async()=> {
    const credentials = path.join(__dirname,'./CredentialsServiceAccount.json') 
    const folderId = process.env.FOLDER_ID_DRIVE
    const mimeType = 'text/sql'
    const file = fs.createReadStream('./my_backup.sql')
    const uploadBackup = new GoogleDriveService(credentials, folderId)
    const response = await uploadBackup.createFileUpload(`backup_of_${new Date().toLocaleString('pt-br')}.sql`, file, mimeType)
    console.log("🚀 ~ file: on-backups.ts ~ line 30 ~ setInterval ~ response", response)

  }, timerUploadDriver)
}

TimeOutBackups()