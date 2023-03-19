import fs from 'fs'
import path from 'path'



function sendFile_handler(req, res, next) {  


  try {

    let file = req.files.file
    
    let fileToUpload = file.name
    
    let currentFolder = req.dataFromMiddleware.currentFolder

    let fileToUploadPath = path.join(currentFolder, fileToUpload)

    // some checks
    if (fs.existsSync(fileToUploadPath)) {
      console.log(fileToUploadPath);
      throw new Error(`"${fileToUpload}" already exists`)
    }

    // space available check
    let currentUser = req.dataFromMiddleware.currentUser
    let spaceUsed_inMb = currentUser.spaceUsed_inMb
    spaceUsed_inMb += (file.size / 1024) / 1024

    if (spaceUsed_inMb > global.MAX_STORAGE_SIZE_IN_MB) {
      throw new Error(`all space at PASS storage is used`)
    }

    
    // write new spaceUsed to users.json
    let users = JSON.parse( fs.readFileSync('users.json', 'utf8') )
    users.forEach(
      (u) => {
        if (u.userId == currentUser.userId) {
          u.spaceUsed_inMb = spaceUsed_inMb
        }
      }
    )
    fs.writeFileSync('users.json', JSON.stringify(users, null, '\t'))


    file.mv(fileToUploadPath)




    // resp
    let objToSend = {
      'isSuccess': true,
    }
    res.send(objToSend)


  } catch (error) {
    
    next(error)
  }
}



export default sendFile_handler
